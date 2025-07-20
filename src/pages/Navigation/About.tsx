import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import userProfileImage from '../../assets/exampleProfilePage.webp';
import analyticsExample from '../../assets/profileAnalytics.webp';
import discover from '../../assets/discover.webp'
import { HighlightText } from '../../components/Util/TextComponents';

export const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-[100vh]">
            <Helmet>
                <meta
                    name="description"
                    content="Find out more about the MusicMe platform. Learn about how you can share music, our long term goals and why you should use our platform."
                />
            </Helmet>
            <nav className="navbar border-b-2 border-accent">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost text-xl md:text-4xl">
                        MusicMe
                    </a>
                </div>
                <ul className="flex-none gap-2 inline-flex"></ul>
                <li>
                    <a href="/" className="btn btn-sm md:btn-md btn-ghost md:text-xl">
                        Login
                    </a>
                </li>
                <li>
                    <a href="/register" className="btn btn-sm md:btn-md btn-ghost md:text-xl">
                        Sign up for the beta
                    </a>
                </li>
            </nav>

            <div className="p-4 md:grid md:grid-cols-2 flex-1">
                <TextTile title="What is MusicMe?">
                    <p>
                        MusicMe is an online social media platform aimed at allow users to share their music taste with
                        others, discover new music, gain and share insights into their music taste.
                    </p>
                </TextTile>
                <ImageTile src={userProfileImage} />

                <ImageTile src={analyticsExample} />
                <TextTile title="Why use our platform?">
                    <p>Our platform is a way to give your opinion on songs and give them a rating</p>
                    <br />
                    <p>
                        In the start we will aim to create as many new features as users feel necessary. We want to
                        create a platform for the music community
                    </p>
                    <br />
                    <p>Some of the things were actively working on are:</p>
                    <ul className="ml-3 list-disc">
                        <li>
                            <HighlightText bold={true}>Dedicated pages</HighlightText> for genres where you can find out
                            about events happening neaby, new trending music for a specific genre and some of the top
                            reccomended songs recently for a genre
                        </li>
                        <li>
                            Showing you <HighlightText bold={true}>live analytics</HighlightText> of what the top
                            searched songs on the platform are each day as well as the top artists and top reviews and
                            providing you as much insight into these songs as possible
                        </li>
                    </ul>
                </TextTile>

                <TextTile title="Future goals">
                    <p>As mentioned above we will be happy to listen to any product requests from users</p>
                    <br />
                    <p>Some of the goals we already have planned are:</p>
                    <ul className="ml-3 list-disc">
                        <li>Support for apple music</li>
                        <li>Greater profile analytics</li>
                        <li>Song suggestions using AI/ML</li>
                    </ul>
                </TextTile>
                <ImageTile src={discover} />
            </div>

            <footer className="md:mt-10">
                <div className="bg-base-300 flex justify-between px-10 py-8">
                    Created by Thomas Mazzag
                    <div aria-label="links" className="flex gap-2">
                        <a href="https://www.linkedin.com/in/thomas-mazzag/" className="linkedin" target="_blank">
                            <i className="fa-brands fa-linkedin fa-2xl" aria-hidden="true"></i>
                        </a>
                        <a href="https://github.com/TomMazzag" className="github" target="_blank">
                            <i className="fa-brands fa-github fa-2xl" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

interface TextTileProps {
    title: string;
    children?: ReactNode;
}

const TextTile = ({ title, children }: TextTileProps) => {
    return (
        <div className="bg-base-300 px-10 py-6 rounded-xl md:mx-14 my-6">
            <h1 className="text-accent text-3xl mb-2">{title}</h1>
            {children}
        </div>
    );
};

interface ImageTileProps {
    src: string;
}

const ImageTile = ({ src }: ImageTileProps) => {
    return (
        <div className="flex items-center md:mx-14 my-6 md:px-10  py-2 md:py-6 rounded-xl border border-accent">
            <img src={src} alt="" />
        </div>
    );
};
