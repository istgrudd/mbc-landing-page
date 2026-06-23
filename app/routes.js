import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("projects", "routes/projects.jsx"),
  route("projects/:slug", "routes/project.jsx"),
  route("research", "routes/research.jsx"),
  route("research/:slug", "routes/research-item.jsx"),
  route("events", "routes/events.jsx"),
  route("events/:slug", "routes/event.jsx"),
];
