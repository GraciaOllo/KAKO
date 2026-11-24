import jwt from "jsonwebtoken";

// Middleware basique – à remplacer/améliorer par le membre Auth
export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Non autorisé – token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, ... }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

export const sellerOnly = (req, res, next) => {
  if (req.user && (req.user.role === "vendeur" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403).json({ message: "Accès réservé aux vendeurs" });
  }
};
