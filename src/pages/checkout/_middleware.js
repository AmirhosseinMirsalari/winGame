import { NextResponse } from 'next/server'

export default async function middleware(req, res) {

    if (!req.cookies.access_token) {
        return NextResponse.redirect("http://localhost:3000/?login=open");
    }
    return NextResponse.next();
}