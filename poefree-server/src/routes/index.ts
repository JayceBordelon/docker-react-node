import { Router, Request, Response } from "express";
import userRoutes from "./user.routes"
import poemRoutes from "./poem.routes"

const router = Router();

router.use("/user", userRoutes);
router.use("/poem", poemRoutes);


// Return all routes for the API
router.get("/", (req: Request, res: Response) => {
  const routes = [
    { path: "/user", description: "User-related operations (e.g., login, register, profile)" },
    { path: "/poem", description: "Poem-related operations (e.g., create, read, update, delete)" },
    { path: "/uploads/:filename", description: "get file by name" },
  ];

  res.json({
    message: "API is healthy!",
    routes: routes,
  });
});

export default router;
