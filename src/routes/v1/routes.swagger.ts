import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api3/swagger:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the API. Can be used to populate a list of users in your system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
router.get('/swagger', (req, res) => {
    res.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]);
  });


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *       404:
 *         description: User not found.
 */
router.get('/users/:id', (req, res) => {
  const user = { id: req.params.id, name: 'John Doe' };
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
export default router;