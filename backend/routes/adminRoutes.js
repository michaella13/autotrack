const express = require('express');
const router = express.Router();
const AdminController=require('../auth/AdminController')


/**
 * @swagger
 * /signup:
 *   post:
 *     tags: [ADMIN MODULE]
 *     description: Add new admin
 *     summary: Add new admin 
 *     parameters: 
 *       - name: Names
 *         description: The admin's username
 *         type: string
 *         in: formData
 *         example: 'admin'
 *         required: true
 *       - name: Email
 *         description: The admin's email
 *         type: string
 *         in: formData
 *         example: 'm@gmail.com'
 *         required: true
 *       - name: Phone number
 *         description: The admin's phone Number
 *         type: integer
 *         in: formData
 *         example: 0782312345
 *         required: true
 *       - name: National Id
 *         description: The admin's ID
 *         type: integer
 *         in: formData
 *         example: 1200437483938374444443
 *         required: true
 *       - name: Password
 *         description: The admin's password
 *         type: string
 *         in: formData
 *         example: '1233#qwerty'
 *         required: true
 * 
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post('/signup',AdminController.signup);


/**
 * @swagger
 * /login:
 *   post:
 *     tags: [ADMIN MODULE]
 *     description: Admin login
 *     summary: Admin login
 *     parameters:
 *       - name: Email
 *         description: The admin's email
 *         type: string
 *         in: formData
 *         example: 'm@gmail.com'
 *         required: true
 *       - name: Password
 *         description: The admin's password
 *         type: string
 *         in: formData
 *         example: '1233#qwerty'
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/login',AdminController.login)
module.exports=router;