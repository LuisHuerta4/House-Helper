import { facebook, instagram, twitter } from "../assets/icons";
import {FoliageCard, PoolCard, FurnitureCard, PetsCard} from "../assets/HomeImages";

export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#categories", label: "Categories" },
    { href: "#contact-us", label: "Contact Us" },
];

export const categories = [
    {
        imgURL: FoliageCard,
        name: "Foliage",
        description: "Plants, Lawns, Gardens",
    },
    {
        imgURL: PoolCard,
        name: "Pools",
        description: "Cleaning, Maintenance, Installation",
    },
    {
        imgURL: FurnitureCard,
        name: "Furniture",
        description: "Assembly, Repair, Refurbishing",
    },
    {
        imgURL: PetsCard,
        name: "Pets",
        description: "Walking, Grooming, Sitting",
    },
];

export const footerLinks = [
    {
        title: "Categories",
        links: [
            { name: "Foliage", link: "/" },
            { name: "Pools", link: "/" },
            { name: "Furniture", link: "/" },
            { name: "Pets", link: "/" },
            { name: "Garage", link: "/" },
            { name: "External", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@HouseHelper.com", link: "mailto:customer@HouseHelper.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];