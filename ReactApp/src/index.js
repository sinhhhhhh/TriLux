import React from "react";
import ReactDOM from "react-dom/client";
// import BlogList from "./BlogList";
import HtmlEditor from "./Admin/HtmlEditor";
import ImageSlider from "./ImageSlider";
import ShowBlogs from "./Admin/ShowBlogs";
import HomeRenovation from "./Service/HomeRenovation";
import Staging from "./Service/Staging";
import SingleBlogtaging from "./Service/SingleBlog";
import Landscaping from "./Service/Landscaping";
import Cleaning from "./Service/Cleaning";
import PropertyMaintenance from "./Service/PropertyMaintenance";

const rootSlider = document.getElementById("react-slider");
if (rootSlider) {
  ReactDOM.createRoot(document.getElementById("react-slider")).render(
    <ImageSlider />
  );
}

const rootShowBlogList = document.getElementById("show-blog-container");
if (rootShowBlogList) {
  ReactDOM.createRoot(rootShowBlogList).render(<ShowBlogs />);
}
const rootEditor = document.getElementById("react-editor");
if (rootEditor) {
  ReactDOM.createRoot(rootEditor).render(<HtmlEditor />);
}

const rootHomeRenovation = document.getElementById("blog-homerenovation-list");
if (rootHomeRenovation) {
  ReactDOM.createRoot(rootHomeRenovation).render(<HomeRenovation />);
}

const rootStaging = document.getElementById("blog-staging-list");
if (rootStaging) {
  ReactDOM.createRoot(rootStaging).render(<Staging />);
}

const rootLandscaping = document.getElementById("blog-landscaping-list");
if (rootLandscaping) {
  ReactDOM.createRoot(rootLandscaping).render(<Landscaping />);
}

const rootCleaning = document.getElementById("blog-cleaning-list");
if (rootCleaning) {
  ReactDOM.createRoot(rootCleaning).render(<Cleaning />);
}

const rootPropertyMaintenance = document.getElementById(
  "blog-propertymaintenance-list"
);
if (rootPropertyMaintenance) {
  ReactDOM.createRoot(rootPropertyMaintenance).render(<PropertyMaintenance />);
}

const rootSingleBlog = document.getElementById("single-blog-container");
if (rootSingleBlog) {
  ReactDOM.createRoot(rootSingleBlog).render(<SingleBlogtaging />);
}
