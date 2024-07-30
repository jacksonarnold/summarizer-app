import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // You have access to the session and user information
  res.status(200).json({ message: "Protected content", user: session.user });
};