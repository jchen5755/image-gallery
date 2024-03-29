import { Alert } from "@/components/bootstrap";
import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
    params: { username: string };
}

async function getUser(username: string): Promise<UnsplashUser> {
    const response = await fetch(
        `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (response.status === 404) {
        notFound();
    }

    return await response.json();
}

//this is if not using native fetch ie. axios
const getUserCached = cache(getUser);

export async function generateMetadata({
    params: { username },
}: PageProps): Promise<Metadata> {
    const user: UnsplashUser = await getUserCached(username);

    //return { title: user.first_name + " " + user.last_name};
    return {
        title:
            ([user.first_name, user.last_name].filter(Boolean).join(" ") ||
                user.username) + " - NextJS 14.1 Image Gallery",
    };
}

export default async function Page({ params: { username } }: PageProps) {
    const user: UnsplashUser = await getUserCached(username);

    return (
        <div>
            <Alert>
                This profile page uses <strong>generateMetadata</strong> to set
                the <strong>page title</strong> dynamically from the API
                response.
            </Alert>
            <h1>{user.username}</h1>
            <p>First Name : {user.first_name}</p>
            <p>Last Name : {user.last_name}</p>
            <a href={"https://unsplash.com/" + user.username}>
                Unsplash Profile
            </a>
        </div>
    );
}
