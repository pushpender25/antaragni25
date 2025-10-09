import { ContactItem, SponsorItem } from "@repo/model";

const contacts: ContactItem[] = [
	{
		name: "Gundeep Singh",
		contact: 9887163503,
		insta: "https://www.instagram.com/gundeepsinghz/",
		linkedin: "https://www.linkedin.com/in/gundeep-singh-ab220b292/",
        image: '/contacts/Gundeep.jpg'
	},
	{
		name: "Harsh Vazirani",
		contact: 9301459969,
		insta: "https://www.instagram.com/gabbruuuu_/",
		linkedin:"https://www.linkedin.com/in/harsh-vazirani-747562299/?originalSubdomain=in",
        image: '/contacts/Harsh.jpeg'
	},
	{
		name: "Sanchit Garg",
		contact: 7814234636,
		insta: "https://www.instagram.com/deesanchit/",
		linkedin: "https://www.linkedin.com/in/sanchit-garg-ba69802a8/",
        image: '/contacts/Sanchit.jpeg'
	},
	{
		name: "Vineet Kumar Sharma",
		contact: 8961692650,
		insta: "https://www.instagram.com/vineet_xd_/?hl=en",
		linkedin: "https://www.linkedin.com/in/vineet-sharma-79b340282/",
        image: '/contacts/Vineet.jpg'
	},
	{
		name: "Yashasvi Mahajan",
		contact: 6239983543,
		insta: "https://www.instagram.com/yashasvi_mj?igsh=czU0d3hlOTVtNzls",
		linkedin: "www.linkedin.com/in/yashasvi-mahajan-345644294",
        image: '/contacts/Yashasvi.jpeg'
	},
];

const outreachPartners: SponsorItem[] = [
    {
        name: "The Product Folks",
        image: "/sponsors/productFolks.jpg",
        url: "https://www.theproductfolks.com/"
    },
    {
        name: "VSkills",
        image: "/sponsors/vSkills.jpg",
        url: "https://www.vskills.in/certification/"
    },
    {
        name: "Easy Shiksha",
        image: "/sponsors/easyShiksha.jpg",
        url: "https://easyshiksha.com/"
    },
]

const goodiesPartners: SponsorItem[] = [
    {
        name: "Swashaa",
        image: "/sponsors/swashaa.png",
        url: "https://www.swashaa.com/"
    },
    {
        name: "Supervek",
        image: "/sponsors/supervek.png",
        url: "https://supervek.in/"
    },
    {
        name: "Urban Drift",
        image: "/sponsors/urbanDrift.png",
        url: "https://urbandrift.in/"
    },
]

const travellingPartner: SponsorItem[] = [
    {
        name: "Intr City",
        image: "/sponsors/intrcity_logo.jpg",
        url: "https://intrcity.com/"
    }
]

export {
    contacts,
    outreachPartners,
    goodiesPartners,
    travellingPartner
}