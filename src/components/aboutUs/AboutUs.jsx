export default function AboutUs() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to the Movie Portal! We are dedicated to providing a seamless
        experience for movie enthusiasts to explore, add, and manage their
        favorite movies. Our platform is user-friendly and aims to bring the joy
        of movies to everyone.
      </p>
      <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
      <p className="mb-4">
        To create a comprehensive platform for movie lovers to discover, manage,
        and share their favorite movies.
      </p>
      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p>
        If you have any questions or suggestions, feel free to reach out at{" "}
        <a href="mailto:support@movieportal.com" className="text-blue-500">
          support@movieportal.com
        </a>
        .
      </p>
    </div>
  );
}
