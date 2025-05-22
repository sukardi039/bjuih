"How do I convert this:"

[
    { "page": "main", "mark": "saveHpme", "text": "Save to Home Page" },
    { "page": "main", "mark": "bookmark", "text": "Bookmark this page" },
    { "page": "main", "mark": "intro", "text": "About Us" },
    { "page": "menu", "mark": "gotoHome", "text": "Return to Home" },
    { "page": "menu", "mark": "gotoAbout", "text": "Know More" }
]

"to:"

{
    "main" {
        "saveHome": "Save to Home Page",
        "bookmark": "Bookmark this page",
        "intro":"About Us"
    },
    "menu" {
        "gotoHome": "Return to Home",
        "gotoAbout":"Know More"
    }
}