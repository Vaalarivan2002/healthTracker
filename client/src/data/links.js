const today = new Date()
const date = today.getDate()
const month = today.getMonth() + 1
export const links = [
    {
      id: 1,
      url: "/",
      text: "home",
    },
    {
      id: 2,
      url: "/about",
      text: "about",
    },
    {
      id: 3,
      url: `/services`,
      text: "services",
    },
    {
      id: 4,
      url: "/contact",
      text: "contact",
    },
    {
      id: 5,
      url: "/login",
      text: "login",
    },
    {id: 6,
    url: "/register",
    text: "register",
    },
    
  ]

  export const authOnlyLinks = [
    {
      id: 1,
      url: "/",
      text: "home",
    },
    {
      id: 2,
      url: "/profile",
      text: "profile",
    },
    {
      id: 3,
      url: `/sessions`,
      text: "track",
    },
    {
      id: 4,
      url: "/pattern",
      text: "analytics",
    },
    // logout is a separate component
    
  ]