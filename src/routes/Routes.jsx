import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard";
import CreateRequest from "../pages/Dashboard/CreateRequest";
import PendingDonationRequests from "../pages/PendingDonationRequests/PendingDonationRequests";
import RequestViewDetails from "../pages/RequestViewDetails/RequestViewDetails";
import { axiosSecure } from "../hooks/useAxiosSecure";
import Profile from "../pages/Dashboard/Profile";
import DonorHomePage from "../pages/Dashboard/DonorHomePage";
import UpdateRequest from "../pages/Dashboard/UpdateRequest";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import AdminHomePage from "../pages/Dashboard/AdminHomePage";
import AllUsers from "../pages/Dashboard/AllUsers";
import AllBloodDonationRequest from "../pages/Dashboard/AllBloodDonationRequest";
import ContentManagement from "../pages/Dashboard/ContentManagement";
import AddBlog from "../pages/Dashboard/AddBlog";
import EditBlog from "../pages/Dashboard/EditBlog";
import AllDonationRequestVolunteerRole from "../pages/Dashboard/AllDonationRequestVolunteerRole";
import ContentManagementVolunteer from "../pages/Dashboard/ContentManagementVolunteer";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import { axiosPublic } from "../hooks/useAxiosPublic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/sign_up',
        element: <SignUp></SignUp>
      },
      {
        path: '/donation_requests',
        element: <PendingDonationRequests></PendingDonationRequests>
      },
      {
        path: '/requests_details/:id',
        element: <RequestViewDetails></RequestViewDetails>,
        loader: ({ params }) => axiosSecure(`/requests_details/${params.id}`)
      },
      {
        path: '/update_request/:id',
        element: <UpdateRequest></UpdateRequest>,
        loader: ({ params }) => axiosSecure(`/requests_details/${params.id}`)
      },
      {
        path: '/all_blogs',
        element: <AllBlogs></AllBlogs>
      },
      {
        path: '/blog_details/:id',
        element: <BlogDetails></BlogDetails>,
        loader: ({ params }) => axiosPublic(`/expected_blog/${params.id}`)
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard/create_request',
        element: <CreateRequest></CreateRequest>
      },
      {
        path: '/dashboard/profile',
        element: <Profile></Profile>
      },
      {
        path: '/dashboard/donor_home_page',
        element: <DonorHomePage></DonorHomePage>
      },
      {
        path: '/dashboard/my_donation_requests',
        element: <MyDonationRequests></MyDonationRequests>
      },
      {
        path: '/dashboard/admin_home_page',
        element: <AdminHomePage></AdminHomePage>
      },
      {
        path: '/dashboard/all_users',
        element: <AllUsers></AllUsers>
      },
      {
        path: '/dashboard/all_blood_donation_requests',
        element: <AllBloodDonationRequest></AllBloodDonationRequest>
      },
      {
        path: '/dashboard/content_management',
        element: <ContentManagement></ContentManagement>
      },
      {
        path: '/dashboard/add_blog',
        element: <AddBlog></AddBlog>
      },
      {
        path: '/dashboard/edit_blog/:id',
        element: <EditBlog></EditBlog>,
        loader: ({ params }) => axiosSecure(`/expected_blog/${params.id}`)
      },
      {
        path: '/dashboard/all_donation_requests_volunteer_role',
        element: <AllDonationRequestVolunteerRole></AllDonationRequestVolunteerRole>
      },
      {
        path: '/dashboard/content_management_volunteer',
        element: <ContentManagementVolunteer></ContentManagementVolunteer>
      }
    ]
  }
]);

export default router;