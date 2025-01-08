import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { successResponse, errorResponse } from '../utils/responseHelpers';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          errorResponse(ReasonPhrases.BAD_REQUEST, [
            'Username or email already exists',
          ]),
        );
      return;
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();

    // Create a session for the user
    req.session.user = {
      id: savedUser._id as string,
      username: savedUser.username,
    };

    res.status(StatusCodes.CREATED).json(
      successResponse(
        {
          id: savedUser._id,
          username: savedUser.username,
        },
        ReasonPhrases.CREATED, // "Created"
      ),
    );
  } catch (error) {
    console.error('Error registering user:', error);
    if (error instanceof Error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [error.message]),
        );
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [
            'Unknown error occurred',
          ]),
        );
    }
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse(ReasonPhrases.NOT_FOUND, ['User not found']));
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          errorResponse(ReasonPhrases.UNAUTHORIZED, ['Invalid credentials']),
        );
      return;
    }

    // Create a session for the user
    req.session.user = {
      id: user._id as string,
      username: user.username,
    };

    res.status(StatusCodes.OK).json(
      successResponse(
        {
          id: user._id,
          username: user.username,
        },
        ReasonPhrases.OK, // "OK"
      ),
    );
  } catch (error) {
    console.error('Error logging in user:', error);
    if (error instanceof Error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [error.message]),
        );
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [
            'Unknown error occurred',
          ]),
        );
    }
  }
};
