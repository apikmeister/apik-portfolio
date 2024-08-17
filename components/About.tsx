function About() {
  return (
    <section className="h-screen flex flex-col justify-evenly items-center overflow-hidden snap-always snap-center">
      <h1 className="sm:text-4xl font-bold">Here is a little background</h1>
      <article className="text-justify text-xs sm:text-base whitespace-pre-line lg:w-1/2 text-gray-800 dark:text-gray-400  prose dark:prose-invert max-w-prose">
        <p>
          I'm Muhammad Afiq, a computer science student with a focus on mobile
          computing.
        </p>
        <p>
          My journey began in elementary school when I learned HTML and CSS to
          build my own site. Later, I delved deeper into HTML and CSS, as well
          as Java, PHP, MySQL, and JavaScript during my secondary education.
        </p>
        <p>
          In my free time, I enjoyed building and maintaining a third-party
          online server for Grand Theft Auto V (FiveM), which helped me improve
          my JavaScript and Lua skills. Pursuing a foundation in STEM further
          fueled my passion for technology.
        </p>
        <p>
          I love taking on new challenges and keeping up with the latest
          advancements in technology. I can't wait to see where my passion takes
          me and how I can contribute to this exciting field.
        </p>
      </article>
    </section>
  );
}

export default About;
