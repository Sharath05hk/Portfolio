import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import emailjs from '@emailjs/browser';

// ICONS
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" className="feather feather-mail">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" className="feather feather-github">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" className="feather feather-linkedin">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" className="feather feather-menu">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" className="feather feather-x">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

// COMPONENTS
const Header = ({ onMenuClick }) => (
  <header className="header">
    <div className="container">
      <h1 className="header-title">Portfolio</h1>
      <nav className="header-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#internships">Internships</a>
        <a href="#certificates">Certificates</a>
        <a href="#resume">Resume</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="menu-button" onClick={onMenuClick} aria-label="Open menu">
        <MenuIcon />
      </button>
    </div>
  </header>
);

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="mobile-menu">
      <button className="mobile-menu-close-btn" onClick={onClose} aria-label="Close menu">
        <XIcon />
      </button>
      <nav className="mobile-menu-nav">
        <a href="#home" onClick={onClose}>Home</a>
        <a href="#about" onClick={onClose}>About</a>
        <a href="#skills" onClick={onClose}>Skills</a>
        <a href="#projects" onClick={onClose}>Projects</a>
        <a href="#education" onClick={onClose}>Education</a>
        <a href="#internships" onClick={onClose}>Internships</a>
        <a href="#certificates" onClick={onClose}>Certificates</a>
        <a href="#resume" onClick={onClose}>Resume</a>
        <a href="#contact" onClick={onClose}>Contact</a>
      </nav>
    </div>
  );
};

const HERO_ROLES = ['Full Stack Developer', 'Creative Coder', 'Problem Solver'];

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef(null);

  useEffect(() => {
    const fullRole = HERO_ROLES[currentRoleIndex];
    const delay = isDeleting ? 60 : 120;

    const tick = setTimeout(() => {
      const nextText = isDeleting
        ? fullRole.slice(0, displayedRole.length - 1)
        : fullRole.slice(0, displayedRole.length + 1);

      setDisplayedRole(nextText);

      if (!isDeleting && nextText === fullRole) {
        pauseRef.current = setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && nextText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((i) => (i + 1) % HERO_ROLES.length);
      }
    }, delay);

    return () => {
      clearTimeout(tick);
      if (pauseRef.current) {
        clearTimeout(pauseRef.current);
        pauseRef.current = null;
      }
    };
  }, [displayedRole, isDeleting, currentRoleIndex]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="blob-1 animate-blob"></div>
        <div className="blob-2 animate-blob animation-delay-2000"></div>
        <div className="blob-3 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container hero-content">
        <h2 className="hero-title">
          Hello, I'm <span className="hero-title-highlight">Sharath Raj H K</span>
        </h2>
        <h3 className="hero-subtitle">
          A <span className="hero-subtitle-highlight">{displayedRole}</span>
          <span className="blinking-cursor"></span>
        </h3>
        <p className="hero-description">
          I believe every line of code is an opportunity to innovate, solve real-world challenges, and create meaningful digital experiences.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">Get In Touch</a>
          <a href="#projects" className="btn btn-secondary">View My Work</a>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="about-section">
    <div className="container">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div className="about-image-container">
          <div className="about-image">
            <img src="/portfolio_pic1.png" alt="Sharath Raj H K portrait" />
          </div>
        </div>
        <div className="about-text-content">
          <h3>Transforming Ideas into Code</h3>
          <p>
            I Enjoy turning ideas into practical and user-friendly web applications. As a Full Stack Developer, I focus on building projects that are not only functional but also easy and enjoyable to use.
          </p>
          <p>
            My journey started with simple curiosity about how things work on the web, and over time it grew into a real passion for creating useful solutions. For me, technology isn’t just about writing code — it’s about solving problems and making things better for people.
          </p>
          <div className="about-social-links">
            <a aria-label="GitHub" href="https://github.com/Sharath05hk"><GithubIcon /></a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/sharath-raj-h-k-05219b295/"><LinkedinIcon /></a>
            <a aria-label="Email" href="mailto:sharathrajhk05@gmail.com"><MailIcon /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skills = [
    { name: 'React', level: 75 },
    { name: 'MongoDB', level: 90 },
    { name: 'SpringBoot', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'MySQL', level: 85 },
    { name: 'TypeScript', level: 60 },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <h3>{skill.name}</h3>
              <div className="skill-bar-container">
                <div className="skill-bar" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, description, imageUrl, tags, codeUrl }) => (
  <div className="project-card">
    <img src={imageUrl} alt={title} />
    <div className="project-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-tags">
        {tags.map((tag, i) => (
          <span key={`${title}-${tag}-${i}`} className="project-tag">{tag}</span>
        ))}
      </div>
      <div className="project-links">
        <a 
          href={codeUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="live"
        >
          View SourceCode
        </a>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const projects = [
    {
      title: 'MiniMart E-commerce Platform',
      description: 'A full-featured e-commerce site with product listings, cart, and checkout functionality.',
      imageUrl: 'https://placehold.co/600x400/805AD5/ffffff?text=MiniMart',
      tags: ['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
      codeUrl: 'https://github.com/Sharath05hk/Minimart',
    },
    {
      title: 'Neuro Nav',
      description: 'A Multi-Modal System for Hands-Free Computer Control',
      imageUrl: 'https://placehold.co/600x400/3182CE/ffffff?text=Neuro+Nav',
      tags: ['React', 'Python', 'CNN Model', 'OpenCV', 'Mediapipe', 'pyautogui'],
      codeUrl: 'https://github.com/Sharath05hk/Neuro-Nav',
    },
    {
      title: 'Budget Tracker',
      description: 'Intuitive Platform for Budgeting and Financial Planning.',
      imageUrl: 'https://placehold.co/600x400/D53F8C/ffffff?text=Budget+Tracker',
      tags: ['React', 'TypeScript'],
      codeUrl: 'https://github.com/Sharath05hk/Budget_Tracker',
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const educationEntries = [
    {
      degree: "Master of Computer Applications (Currently Pursuing)",
      school: "St. Philomena’s College (Autonomous)",
      period: "Feb 2024 - Oct 2025",
      details: "Focusing on web development, data structures, and algorithms. Completed several projects including a collaborative project on AI/ML.",
    },
    {
      degree: "Bachelor of Computer Applications",
      school: "Bapuji Institute of Hi-Tech Education",
      period: "Nov 2020 - Aug 2025",
      details: "Focused on software development, database systems, and programming principles. Built an E-Milk System web app for the final year project.",
    },
    {
      degree: "PUC",
      school: "Science Academy PU College",
      period: "Nov 2018 - Mar 2020",
      details: "Emphasis on science and mathematics, building logical reasoning and research-oriented abilities.",
    },
    {
      degree: "SSLC",
      school: "Thrishul Eng Med High School",
      period: "Apr 2018",
      details: "Achieved Secondary School Leaving Certificate, strengthening core academic knowledge and discipline.",
    },
  ];

  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <h2 className="section-title">Education</h2>
        {educationEntries.map((edu) => (
          <div key={edu.degree} className="card">
            <h3 className="card-title">{edu.degree}</h3>
            <h4 className="card-subtitle">{edu.school}</h4>
            <p className="card-period">{edu.period}</p>
            <p className="card-description">{edu.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Internship = () => {
  const internships = [
    {
      role: "Full Stack Developer",
      company: "rProcess Outsourcing Services Pvt. Ltd.",
      period: "May 2025 - June 2025",
      description:
        "Successfully completed a one-month internship as a Full Stack Developer at rProcess Outsourcing Services Pvt. Ltd., Mysore. Worked on a live internal web application — rTrack: Enterprise Asset Management & Maintenance System — built using the MERN Stack.",
      points: [
        "Developed JWT-based secure login with role-based access control",
        "Built modular components for asset tracking and maintenance workflows",
        "Implemented CSV/PDF report export features",
        "Conducted API testing using Postman and performance evaluation with JMeter",
        "Managed collaborative development using GitHub",
        "Deployed the application internally for real-time use",
      ],
      additionalWork:
        "Additionally, contributed to the development of a new user-facing feature using React and Redux. Collaborated with developers and designers to improve application performance and user experience.",
      skillsGained:
        "This internship sharpened skills in React.js, Node.js, Express.js, MongoDB, REST APIs, and secure app design.",
      certificateLink: "/rProcess_Certificate.pdf",
    },
    {
      role: "AI & ML Intern",
      company: "TechSaksham (Microsoft & SAP, Edunet Foundation)",
      period: "Feb 2025 - Mar 2025",
      description:
        "Successfully completed a remote internship in Artificial Intelligence and Machine Learning.",
      points: [
        "Executed module-based assignments and assessments with consistent performance",
        "Acquired in-depth understanding of AI concepts, tools, and industry applications",
        "Developed and deployed small-scale AI projects as part of the internship curriculum",
        "Applied AI techniques to address practical problem statements, gaining valuable hands-on experience"
      ],
      certificateLink: "/AI&ML_Certificate.pdf"
    }
  ];

  return (
    <section id="internships" className="internship-section">
      <div className="section-container">
        <h2 className="section-title">Internships</h2>
        {internships.map((internship, index) => (
          <div key={`${internship.role}-${index}`} className="card">
            <h3 className="card-title">{internship.role}</h3>
            <h4 className="card-subtitle">{internship.company}</h4>
            <p className="card-period">{internship.period}</p>

            {internship.description && (
              <p className="card-description">{internship.description}</p>
            )}

            {internship.points?.length > 0 && (
              <ul className="card-points">
                {internship.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}

            {internship.additionalWork && (
              <p className="card-description">{internship.additionalWork}</p>
            )}

            {internship.skillsGained && (
              <p className="card-description">{internship.skillsGained}</p>
            )}

            {internship.certificateLink && (
              <a
                href={internship.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="view-cert-btn"
              >
                View Certificate
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Certificates = () => {
  const certificates = [
    {
      title: "Java Programming for Beginners",
      provider: "Simpli Learn",
      link: "#",
      imageUrl: "https://placehold.co/400x250/2d3748/fff?text=Java+Cert",
      href: "/Java_certificate_Simpli_Learn.pdf",
    },
    {
      title: "Software Engineering and Agile software development",
      provider: "Infosys Springboard",
      link: "#",
      imageUrl: "https://placehold.co/400x250/2d3748/fff?text=Agile+Cert",
      href: "/Infosys_Agile.pdf",
    },
    {
      title: "ECommerce & Tech Quiz of the Flipkart GRiD 6.0 - Software Development",
      provider: "Flipkart",
      link: "#",
      imageUrl: "https://placehold.co/400x250/2d3748/fff?text=Flipkart+Cert",
      href: "/Sharathflipkart.pdf",
    },
    {
      title: "Programming Fundamentals using Python",
      provider: "Infosys Springboard",
      link: "#",
      imageUrl: "https://placehold.co/400x250/2d3748/fff?text=Python+Cert",
      href: "/Python.pdf",
    },
  ];

  return (
    <section id="certificates" className="certificates-section">
      <div className="section-container">
        <h2 className="section-title">Certificates</h2>
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div key={cert.title} className="card">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }}
              />
              <h3 className="card-title">{cert.title}</h3>
              <h4 className="card-subtitle">Issued by {cert.provider}</h4>
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                View Certificate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Resume = () => (
  <section id="resume" className="resume-section">
    <div className="section-container">
      <h2 className="section-title">My Resume</h2>
      <div className="resume-content">
        <p className="resume-text">
          View my full resume to discover more about my professional journey and achievements.
        </p>
        <a
          href="/resume.pdf"
          download="Resume.pdf"
          className="resume-btn"
        >
          📄 Download Resume
        </a>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setStatus('Sending...');

    emailjs
      .sendForm(
        'service_4gs0laq',
        'template_qizo4ps',
        formRef.current,
        'Ukl84mpKgbrdssZlK'
      )
      .then(() => {
        setStatus('✅ Thank you — your message was sent!');
        formRef.current.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus('❌ Failed to send. Please try again later.');
      })
      .finally(() => setSending(false));
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-form-container">
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="from_name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>

            <div className="footer-actions">
              <button className="form-submit-btn" type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>

              <div className="about-social-links">
                <a aria-label="GitHub" href="https://github.com/Sharath05hk"><GithubIcon /></a>
                <a aria-label="LinkedIn" href="https://www.linkedin.com/in/sharath-raj-h-k-05219b295/"><LinkedinIcon /></a>
                <a aria-label="Email" href="mailto:sharathrajhk05@gmail.com"><MailIcon /></a>
              </div>
            </div>
          </form>

          {status && <p className="form-status">{status}</p>}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    toggle();
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Sharath Raj H K. All Rights Reserved.</p>

          <button
            className={`rollback-btn ${isVisible ? 'show' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-fadeIn');
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Internship />
        <Certificates />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}