import type { NextAdminOptions } from "@premieroctet/next-admin";
import Image from "next/image";

//NOTE This component is used to set the title of the admin dashboard
const AdminTitle = () => {
  return <div className="items-center flex space-x-2">
    <Image alt="Logo" src={"/logo.svg"} height={40} width={40} />
    <div className="text-lg">Admin Dashboard</div>
  </div>;
}


//NOTE This variable is used to set the pages of the admin dashboard
const pagesOptions: NextAdminOptions['pages'] = {
  "": {
    title: "Dashboard",
    icon: "HomeIcon"
  }
}

//NOTE This variable is used to set the external links of the admin dashboard
const externalLinksOptions: NextAdminOptions['externalLinks'] = [

]

//NOTE This variable is used to set the models of the admin dashboard
const modelOptions: NextAdminOptions['model'] = {

  // REVIEW Post Model
  Post: {
    title: "Posts",
    icon: "DocumentTextIcon",
    list: {
      defaultSort: { field: "createdAt", direction: "desc" },
      exports: { url: '#', format: 'CSV' },
      display: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
      fields: {
        title: {},
        content: {},
        createdAt: { formatter: (value) => new Date(value).toLocaleDateString() },
        updatedAt: { formatter: (value) => new Date(value).toLocaleDateString() },
      }
    },
    edit: {
      display: ['title', 'content'],
      fields: {
        title: { tooltip: "This is the title" },
        content: { tooltip: "This is the content" },
      }
    }
  },

  // REVIEW Reaction Model
  Reaction: {
    title: "Reactions",
    icon: "HeartIcon",
    list: {
      defaultSort: { field: "createdAt", direction: "desc" },
      exports: { url: '#', format: 'CSV' },
      display: ['id', 'type', 'createdAt',],
      fields: {
        type: {},
        createdAt: { formatter: (value) => new Date(value).toLocaleDateString() },
      }
    }
  },

  // REVIEW Comment Model
  Comment: {
    title: "Comments",
    icon: "ChatBubbleBottomCenterIcon",
    list: {
      defaultSort: { field: "createdAt", direction: "desc" },
      exports: { url: '#', format: 'CSV' },
      display: ['id', 'content', 'createdAt', 'updatedAt'],
      fields: {
        content: {},
        createdAt: { formatter: (value) => new Date(value).toLocaleDateString() },
        updatedAt: { formatter: (value) => new Date(value).toLocaleDateString() },
      }
    }
  },

  //REVIEW User Model
  User: {
    title: "Users",
    icon: "UserIcon",
    list: {
      exports: { url: '#', format: 'CSV' },
      display: ['username', 'name', 'email', 'updatedAt',],
      fields: {
        username: {},
        name: {},
        email: {},
        createdAt: { formatter: (value) => new Date(value).toLocaleDateString() },
      },
    },
    edit: {
      display: ['username', 'name', 'email', 'password', 'isAdmin'],
      fields: {
        username: { tooltip: "This is the username" },
        name: { tooltip: "This is the name" },
        email: { tooltip: "This is the email" },
        password: { tooltip: "This is the password" },
        bio: { tooltip: "This is the bio" },
        image: { tooltip: "This is the image" },
      }
    },
  },

  //REVIEW Admin Model
  Admin: {
    title: "Admins",
    toString: (value) => `${value.username}-(${value.email})`,
    icon: "IdentificationIcon",
    list: {
      defaultSort: { field: "username", direction: "asc" },
      exports: { url: '#', format: 'CSV' },
      display: ['id', 'username', 'name', 'email', 'createdAt', 'updatedAt',],
      fields: {
        username: {},
        name: {},
        email: {},
        createdAt: { formatter: (value) => new Date(value).toLocaleDateString() },
        updatedAt: { formatter: (value) => new Date(value).toLocaleDateString() },
      }
      ,
    },
    edit: {
      display: ['username', 'name', 'email', 'password', 'isAdmin'],
      fields: {
        username: { tooltip: "This is the username" },
        name: { tooltip: "This is the name" },
        email: { tooltip: "This is the email" },
        password: { tooltip: "This is the password" },
      }
    },
  },

  // REVIEW Tag Model
  Tag: {
    title: "Tags",
    icon: "TagIcon",
    list: {
      defaultSort: { field: "name", direction: "desc" },
      exports: { url: '#', format: 'CSV' },
      display: ['id', 'name', 'posts',],
      fields: {
        name: {},
        posts: {
          formatter: (value) => value.post.title
        }
      }
    }
  },

  // REVIEW TagOnPost Model
  TagOnPost: {
    title: "Tags on Posts",
    icon: "TagIcon",
    list: {
      defaultSort: { field: "tag", direction: "desc" },
      exports: { url: '#', format: 'CSV' },
      display: ['postId', 'tagId',],
      fields: {
        postId: {},
        tagId: {},
      }
    }
  }
}

//NOTE This variable is used to set the sidebar of the admin dashboard
const sidebarOptions: NextAdminOptions['sidebar'] = {
  groups: [
    {
      title: "Post",
      models: ["Post", "Reaction", "Comment"]
    },
    {
      title: "Tag",
      models: ["Tag", "TagOnPost"]
    },
    {
      title: "User management",
      models: ["User", "Admin"]
    }
  ]
}

const options: NextAdminOptions = {
  title: <AdminTitle />,
  model: modelOptions,
  pages: pagesOptions,
  externalLinks: externalLinksOptions,
  forceColorScheme: "dark",
  sidebar: sidebarOptions,
}


export default options;
