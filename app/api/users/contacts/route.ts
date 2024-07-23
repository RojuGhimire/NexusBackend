import { nodemailer } from 'nodemailer';
import { NextRequest, NextResponse } from "next/server";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or use another email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { firstName, lastName, email, mobile } = reqBody;

        if (firstName && lastName && email && mobile) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'User Information',
                text: `Hello ${firstName} ${lastName},\n\nYour mobile number is ${mobile}.\n\nThank you!`,
            };

            await transporter.sendMail(mailOptions);

            return NextResponse.json({
                message: "Email sent successfully",
            }, {
                status: 201,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        } else {
            return NextResponse.json({ message: "All fields are required" }, { status: 401 });
        }

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ err: err.message }, { status: 500 });
    }
}
