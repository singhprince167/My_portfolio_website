"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, FileCode, Layers, Braces, Menu, X, Send, Download, Moon, Sun, Briefcase, Calendar, Rocket, Zap, Lightbulb, Star, Sparkles, Target, GraduationCap, BookOpen } from "lucide-react";
import Image from "next/image";

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [scrollY, setScrollY] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fullText = "Crafting elegant digital experiences with precision and creativity";

  // Typing animation
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Galaxy canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    const particles: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const comets: { x: number; y: number; length: number; angle: number; speed: number }[] = [];

    // Initialize stars
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5,
        opacity: Math.random(),
      });
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random(),
      });
    }

    // Initialize comets
    for (let i = 0; i < 3; i++) {
      comets.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 50 + Math.random() * 100,
        angle: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 3,
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.fillStyle = isDarkMode ? "rgba(18, 18, 18, 0.05)" : "rgba(245, 245, 245, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode
          ? `rgba(0, 255, 255, ${star.opacity * 0.6})`
          : `rgba(100, 100, 100, ${star.opacity * 0.4})`;
        ctx.fill();

        // Twinkle effect
        star.opacity += Math.random() * 0.02 - 0.01;
        star.opacity = Math.max(0.3, Math.min(1, star.opacity));

        // Parallax movement
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw floating particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode
          ? `rgba(0, 255, 255, ${particle.life * 0.4})`
          : `rgba(120, 120, 120, ${particle.life * 0.3})`;
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.002;

        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = 1;
        }
      });

      // Draw comets
      comets.forEach((comet) => {
        const endX = comet.x + Math.cos(comet.angle) * comet.length;
        const endY = comet.y + Math.sin(comet.angle) * comet.length;

        const gradient = ctx.createLinearGradient(comet.x, comet.y, endX, endY);
        if (isDarkMode) {
          gradient.addColorStop(0, "rgba(0, 255, 255, 0.8)");
          gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
        } else {
          gradient.addColorStop(0, "rgba(100, 100, 100, 0.6)");
          gradient.addColorStop(1, "rgba(100, 100, 100, 0)");
        }

        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;

        if (comet.x > canvas.width || comet.y > canvas.height || comet.x < 0 || comet.y < 0) {
          comet.x = Math.random() * canvas.width;
          comet.y = -50;
          comet.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDarkMode]);

  const skills = [
    { name: "React.js", icon: Code2, level: 95 },
    { name: "JavaScript", icon: Braces, level: 90 },
    { name: "Python", icon: FileCode, level: 85 },
    { name: "PHP", icon: Code2, level: 80 },
    { name: "SQL", icon: Database, level: 88 },
  ];

  const experiences = [
    {
      title: "Senior Software Developer",
      company: "Tech Corp",
      period: "2022 - Present",
      description: "Leading development of scalable web applications using React.js and Node.js. Mentoring junior developers and implementing best practices.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Inc",
      period: "2020 - 2022",
      description: "Developed and maintained multiple client projects using modern web technologies. Improved application performance by 40%.",
    },
    {
      title: "Frontend Developer",
      company: "StartUp Labs",
      period: "2018 - 2020",
      description: "Built responsive user interfaces and collaborated with design teams to create seamless user experiences.",
    },
  ];

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Babu Banarasi Das University Lucknow",
      period: "2022 - 2024",
      description: "Computer Applications and Software Development",
      grade: "CGPA: 7.9/10"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Veer Narmad South Gujarat University",
      period: "2019 - 2022",
      description: "Fundamentals of Computer Applications, Programming Languages (C/C++/Java), and Database Management.",
      grade: "CGPA: 7.59/10"
    },
  ];

  const TOTAL_PROJECTS = 4;
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern shopping platform with cart management, product filtering, and responsive design built with React and Bootstrap.",
      tech: ["React.js", "JavaScript", "CSS3"],
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/79455fbf-d721-43d5-ae89-c5e5b8be2b53/generated_images/e-commerce-web-application-interface-moc-d75d36d4-20251117055906.jpg",
      demo: "#",
      github: "#",
      isLive: true,
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather application with location search, forecast display, and beautiful UI animations.",
      tech: ["React.js", "JavaScript", "HTML5"],
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/79455fbf-d721-43d5-ae89-c5e5b8be2b53/generated_images/weather-application-interface-design-dar-c18f7b2d-20251117055909.jpg",
      demo: "#",
      github: "#",
      isLive: false,
    },
    {
      title: "Portfolio Website",
      description: "Clean and modern portfolio showcasing projects with smooth animations and fully responsive design.",
      tech: ["React.js", "CSS3", "Bootstrap"],
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/79455fbf-d721-43d5-ae89-c5e5b8be2b53/generated_images/portfolio-website-interface-mockup-moder-5fd782b7-20251117055926.jpg",
      demo: "#",
      github: "#",
      isLive: false,
    },
    {
      title: "Task Management App",
      description: "Intuitive task manager with drag-and-drop functionality, priority levels, and deadline tracking.",
      tech: ["React.js", "JavaScript", "HTML5"],
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/79455fbf-d721-43d5-ae89-c5e5b8be2b53/generated_images/task-management-app-interface-dark-mode--a6355d0c-20251117055926.jpg",
      demo: "#",
      github: "#",
      isLive: false,
    },
  ];

  const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.tech)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false);
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "static/docs/Prince Singh Resume.pdf";
    link.download = "Prince_Kumar_Singh_Resume.pdf";
    link.click();
  };

  // Theme colors
  const themeColors = {
    dark: {
      bg: "#121212",
      card: "#1a1a1a",
      text: "#ffffff",
      textSecondary: "#b0b0b0",
      accent: "#00FFFF",
      border: "rgba(0, 255, 255, 0.2)",
    },
    light: {
      bg: "#f5f5f5",
      card: "#ffffff",
      text: "#121212",
      textSecondary: "#666666",
      accent: "#0088cc",
      border: "rgba(0, 136, 204, 0.2)",
    },
  };

  const theme = isDarkMode ? themeColors.dark : themeColors.light;

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Galaxy Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Nebula Glow Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${theme.accent}40 0%, transparent 70%)`,
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${30 + mousePosition.y * 0.02}%`,
            filter: "blur(60px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${theme.accent}30 0%, transparent 70%)`,
            right: `${10 + mousePosition.x * 0.015}%`,
            bottom: `${20 + mousePosition.y * 0.015}%`,
            filter: "blur(80px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 w-12 h-12 backdrop-blur-md border rounded-xl flex items-center justify-center hover:scale-105 transition-all"
        style={{
          backgroundColor: `${theme.card}cc`,
          borderColor: theme.border,
          color: theme.text
        }}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Theme Toggle Button - Fixed position */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-50 w-12 h-12 backdrop-blur-md border rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-lg"
        style={{
          backgroundColor: `${theme.card}cc`,
          borderColor: theme.border,
          color: theme.accent
        }}
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-80 backdrop-blur-2xl border-r z-40 transition-all duration-300 overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        style={{
          backgroundColor: `${theme.card}dd`,
          borderColor: theme.border
        }}
      >
        <div className="flex flex-col min-h-full p-8">
          {/* Profile Picture - Made Smaller */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Orbiting Icons */}
              <div className="absolute inset-0">
                {/* Orbit 1 */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s" }}>
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundColor: `${theme.card}dd`,
                      borderColor: theme.accent,
                      boxShadow: `0 0 20px ${theme.accent}40`
                    }}
                  >
                    <Code2 className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>
                </div>

                {/* Orbit 2 */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }}>
                  <div
                    className="absolute top-1/2 -right-3 -translate-y-1/2 w-10 h-10 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundColor: `${theme.card}dd`,
                      borderColor: theme.accent,
                      boxShadow: `0 0 20px ${theme.accent}40`
                    }}
                  >
                    <Rocket className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>
                </div>

                {/* Orbit 3 */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "18s" }}>
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundColor: `${theme.card}dd`,
                      borderColor: theme.accent,
                      boxShadow: `0 0 20px ${theme.accent}40`
                    }}
                  >
                    <Database className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>
                </div>

                {/* Orbit 4 */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "22s", animationDirection: "reverse" }}>
                  <div
                    className="absolute top-1/2 -left-3 -translate-y-1/2 w-10 h-10 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundColor: `${theme.card}dd`,
                      borderColor: theme.accent,
                      boxShadow: `0 0 20px ${theme.accent}40`
                    }}
                  >
                    <Zap className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>
                </div>

                {/* Orbit 5 - Diagonal top-right */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "25s" }}>
                  <div
                    className="absolute top-6 right-6 w-10 h-10 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundColor: `${theme.card}dd`,
                      borderColor: theme.accent,
                      boxShadow: `0 0 20px ${theme.accent}40`
                    }}
                  >
                    <Lightbulb className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>
                </div>

                {/* Orbit 6 - Diagonal bottom-right */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "19s", animationDirection: "reverse" }}>
                  <div
                    className="absolute bottom-6 right-6 w-10 h-10 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundColor: `${theme.card}dd`,
                      borderColor: theme.accent,
                      boxShadow: `0 0 20px ${theme.accent}40`
                    }}
                  >
                    <Sparkles className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>
                </div>

                {/* Orbit 7 - Diagonal top-left */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "23s" }}>
                  <div
                    className="absolute top-6 left-6 w-10 h-10 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundColor: `${theme.card}dd`,
                      borderColor: theme.accent,
                      boxShadow: `0 0 20px ${theme.accent}40`
                    }}
                  >
                    <Star className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>
                </div>

                {/* Orbit 8 - Diagonal bottom-left */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "21s", animationDirection: "reverse" }}>
                  <div
                    className="absolute bottom-6 left-6 w-10 h-10 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundColor: `${theme.card}dd`,
                      borderColor: theme.accent,
                      boxShadow: `0 0 20px ${theme.accent}40`
                    }}
                  >
                    <Target className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>
                </div>

                {/* Orbital Rings */}
                <div
                  className="absolute inset-6 rounded-full border opacity-20"
                  style={{ borderColor: theme.accent }}
                />
                <div
                  className="absolute inset-12 rounded-full border opacity-10"
                  style={{ borderColor: theme.accent }}
                />
              </div>

              {/* Profile Image - Center - Made Smaller */}
              <div
                className="relative w-24 h-24 rounded-full overflow-hidden border-4 shadow-2xl group z-10"
                style={{ borderColor: theme.accent }}
              >
                <Image
                  src="/static/images/prince.jpg"
                  alt="Prince Kumar Singh"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-6 animate-slide-up">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: theme.text }}
            >
              Prince Kumar Singh
            </h1>
            <p
              className="text-sm font-semibold tracking-wide"
              style={{ color: theme.textSecondary }}
            >
              Software Developer
            </p>
          </div>

          {/* Bio */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <p
              className="text-sm leading-relaxed text-center"
              style={{ color: theme.textSecondary }}
            >
              Passionate about creating elegant solutions with modern technologies. Specialized in full-stack development with React.js, JavaScript, and Python.
            </p>
          </div>

          {/* Download Resume Button */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <Button
              onClick={handleResumeDownload}
              className="w-full py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-semibold border-2"
              style={{
                backgroundColor: theme.accent,
                color: isDarkMode ? "#121212" : "#ffffff",
                borderColor: theme.accent
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>

          {/* Navigation */}
          <nav className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <ul className="space-y-3">
              {["Home", "About", "Skills", "Experience", "Education", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 border border-transparent"
                    style={{
                      color: theme.textSecondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.text;
                      e.currentTarget.style.backgroundColor = `${theme.accent}10`;
                      e.currentTarget.style.borderColor = theme.border;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.textSecondary;
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex justify-center gap-4">
              {[
                { icon: Github, href: "https://github.com/singhprince167" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/prince-kumar-singh-73a155222/" },
                { icon: Mail, href: "mailto:princekumarsingh167@gmail.com" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    backgroundColor: `${theme.accent}10`,
                    borderColor: theme.border,
                    color: theme.accent
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme.accent}20`;
                    e.currentTarget.style.borderColor = theme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme.accent}10`;
                    e.currentTarget.style.borderColor = theme.border;
                  }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div
            className="mt-auto pt-6 border-t animate-slide-up"
            style={{
              animationDelay: "0.4s",
              borderColor: theme.border
            }}
          >
            <div className="space-y-2 text-sm">
              <a
                href="mailto:princekumarsingh167@gmail.com"
                className="flex items-center gap-2 transition-colors"
                style={{ color: theme.textSecondary }}
                onMouseEnter={(e) => e.currentTarget.style.color = theme.text}
                onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}
              >
                <Mail className="w-4 h-4" />
                <span>princekumarsingh167@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-80 relative z-10">
        {/* Home Section - Swapped Layout */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-8 order-2 md:order-1">
                <div className="animate-fade-in">
                  <h2
                    className="text-7xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight leading-none"
                    style={{ color: theme.text, lineHeight: '0.4' }} // <-- spacing kam karne ke liye lineHeight add kiya
                  >
                    <span
                      className="inline-block animate-fade-in"
                      style={{
                        animationDelay: "0.1s",
                        color: "#FF69B4",
                        fontSize: '100px'
                      }}
                    >
                      Prince
                    </span>
                    <br />
                    <span
                      className="inline-block animate-fade-in"
                      style={{
                        animationDelay: "0.3s",
                        color: theme.text,
                        fontSize: '75px'
                      }}
                    >
                      Kumar
                    </span>
                    <br />
                    <span
                      className="inline-block animate-fade-in"
                      style={{
                        animationDelay: "0.5s",
                        color: theme.text,
                        fontSize: '50px'
                      }}
                    >
                      Singh
                    </span>
                  </h2>
                  <p
                    className="text-2xl md:text-3xl font-light tracking-widest uppercase mt-6 animate-fade-in"
                    style={{
                      color: theme.textSecondary,
                      animationDelay: "0.7s"
                    }}
                  >
                    Software Developer
                  </p>
                </div>


                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.9s" }}>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="px-8 py-6 text-lg rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 font-semibold border-2"
                    style={{
                      backgroundColor: theme.accent,
                      color: isDarkMode ? "#121212" : "#ffffff",
                      borderColor: theme.accent
                    }}
                  >
                    Contact Me
                  </Button>
                  <Button
                    onClick={() => scrollToSection("projects")}
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300 border-2"
                    style={{
                      borderColor: theme.accent,
                      color: theme.accent,
                      backgroundColor: `${theme.accent}10`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme.accent}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme.accent}10`;
                    }}
                  >
                    My Work
                  </Button>
                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300 border-2"
                    style={{
                      borderColor: theme.accent,
                      color: theme.accent,
                      backgroundColor: `${theme.accent}10`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme.accent}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme.accent}10`;
                    }}
                    onClick={() => window.open("https://github.com/singhprince167", "_blank")}
                  >
                    Github
                  </Button>

                </div>
              </div>

              {/* Right Side - Profile Image */}
              <div className="relative animate-fade-in flex justify-center order-1 md:order-2">
                <div className="relative w-96 h-96 flex items-center justify-center">
                  {/* Orbiting Icons */}
                  <div className="absolute inset-0">
                    {/* Orbit 1 */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s" }}>
                      <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Code2 className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 2 */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }}>
                      <div
                        className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Rocket className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 3 */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "18s" }}>
                      <div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Database className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 4 */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "22s", animationDirection: "reverse" }}>
                      <div
                        className="absolute top-1/2 -left-4 -translate-y-1/2 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Zap className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 5 - Diagonal top-right */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "25s" }}>
                      <div
                        className="absolute top-8 right-8 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Lightbulb className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 6 - Diagonal bottom-right */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "19s", animationDirection: "reverse" }}>
                      <div
                        className="absolute bottom-8 right-8 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Sparkles className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 7 - Diagonal top-left */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "23s" }}>
                      <div
                        className="absolute top-8 left-8 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Star className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 8 - Diagonal bottom-left */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "21s", animationDirection: "reverse" }}>
                      <div
                        className="absolute bottom-8 left-8 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Target className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbital Rings */}
                    <div
                      className="absolute inset-8 rounded-full border opacity-20"
                      style={{ borderColor: theme.accent }}
                    />
                    <div
                      className="absolute inset-16 rounded-full border opacity-10"
                      style={{ borderColor: theme.accent }}
                    />
                    <div
                      className="absolute inset-24 rounded-full border opacity-5"
                      style={{ borderColor: theme.accent }}
                    />
                  </div>

                  {/* Profile Image - Center */}
                  <div
                    className="relative w-72 h-72 rounded-full overflow-hidden border-4 shadow-2xl group z-10"
                    style={{ borderColor: theme.accent }}
                  >
                    <Image
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/79455fbf-d721-43d5-ae89-c5e5b8be2b53/generated_images/modern-developer-portrait-placeholder-ab-d6c59609-20251117055909.jpg"
                      alt="Prince Kumar Singh"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-5xl font-bold mb-16 text-center animate-fade-in"
              style={{ color: theme.text }}
            >
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group animate-fade-in-scale flex justify-center">
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                  {/* Orbiting Icons */}
                  <div className="absolute inset-0">
                    {/* Orbit 1 */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                      <div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Code2 className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 2 */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "25s", animationDirection: "reverse" }}>
                      <div
                        className="absolute top-1/2 -right-2 -translate-y-1/2 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Database className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 3 */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "30s" }}>
                      <div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Layers className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 4 */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "22s", animationDirection: "reverse" }}>
                      <div
                        className="absolute top-1/2 -left-2 -translate-y-1/2 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Braces className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 5 - Diagonal top-right */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "28s" }}>
                      <div
                        className="absolute top-6 right-6 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Rocket className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbit 6 - Diagonal bottom-right */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "26s", animationDirection: "reverse" }}>
                      <div
                        className="absolute bottom-6 right-6 w-12 h-12 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${theme.card}dd`,
                          borderColor: theme.accent,
                          boxShadow: `0 0 20px ${theme.accent}40`
                        }}
                      >
                        <Lightbulb className="w-6 h-6" style={{ color: theme.accent }} />
                      </div>
                    </div>

                    {/* Orbital Rings */}
                    <div
                      className="absolute inset-6 rounded-full border opacity-20"
                      style={{ borderColor: theme.accent }}
                    />
                    <div
                      className="absolute inset-12 rounded-full border opacity-10"
                      style={{ borderColor: theme.accent }}
                    />
                  </div>

                  {/* About Image - Center */}
                  <div
                    className="relative w-80 h-80 rounded-2xl overflow-hidden border-4 shadow-2xl z-10"
                    style={{
                      borderColor: theme.accent,
                      backgroundColor: `${theme.card}80`
                    }}
                  >
                    <Image
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/79455fbf-d721-43d5-ae89-c5e5b8be2b53/generated_images/modern-developer-portrait-placeholder-ab-d6c59609-20251117055909.jpg"
                      alt="About Prince Kumar Singh"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 animate-slide-up">
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: theme.textSecondary }}
                >
                  Hello! I'm a passionate <span style={{ color: theme.accent, fontWeight: 600 }}>Software Developer</span> dedicated to building modern, scalable, and user-friendly applications.
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: theme.textSecondary }}
                >
                  With expertise in <span style={{ color: theme.accent, fontWeight: 600 }}>React.js</span>, <span style={{ color: theme.accent, fontWeight: 600 }}>JavaScript</span>, <span style={{ color: theme.accent, fontWeight: 600 }}>Python</span>, <span style={{ color: theme.accent, fontWeight: 600 }}>PHP</span>, and <span style={{ color: theme.accent, fontWeight: 600 }}>SQL</span>, I create elegant solutions that solve real-world problems.
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: theme.textSecondary }}
                >
                  I'm constantly learning and adapting to new technologies, always pushing the boundaries of what's possible in web development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-5xl font-bold mb-16 text-center animate-fade-in"
              style={{ color: theme.text }}
            >
              Skills & Expertise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <Card
                  key={skill.name}
                  className="skill-card backdrop-blur-md border transition-all duration-300 p-6 group hover:shadow-xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    backgroundColor: `${theme.card}cc`,
                    borderColor: theme.border,
                    boxShadow: `0 4px 6px ${theme.accent}10`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.accent;
                    e.currentTarget.style.boxShadow = `0 8px 16px ${theme.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.border;
                    e.currentTarget.style.boxShadow = `0 4px 6px ${theme.accent}10`;
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl border p-3 group-hover:scale-110 transition-all duration-300"
                      style={{
                        backgroundColor: `${theme.accent}10`,
                        borderColor: theme.border
                      }}
                    >
                      <skill.icon style={{ color: theme.accent }} className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg" style={{ color: theme.text }}>{skill.name}</h3>
                      <span className="text-sm" style={{ color: theme.textSecondary }}>{skill.level}% Proficiency</span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: `${theme.accent}20` }}
                  >
                    <div
                      className="h-full rounded-full relative animate-progress-fill"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: theme.accent
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section - Timeline */}
        <section id="experience" className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-5xl font-bold mb-16 text-center animate-fade-in"
              style={{ color: theme.text }}
            >
              Work Experience
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div
                className="absolute left-8 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: theme.border }}
              />

              {/* Experience Items */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-20 animate-slide-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Timeline Dot */}
                    <div
                      className="absolute left-6 w-5 h-5 rounded-full border-4"
                      style={{
                        backgroundColor: theme.accent,
                        borderColor: theme.bg
                      }}
                    />

                    {/* Content Card */}
                    <Card
                      className="backdrop-blur-md border transition-all duration-300 p-6 hover:shadow-xl group"
                      style={{
                        backgroundColor: `${theme.card}cc`,
                        borderColor: theme.border
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = theme.accent;
                        e.currentTarget.style.transform = "translateX(8px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = theme.border;
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <Briefcase
                          className="w-5 h-5 mt-1 flex-shrink-0"
                          style={{ color: theme.accent }}
                        />
                        <div>
                          <h3
                            className="text-xl font-bold mb-1"
                            style={{ color: theme.text }}
                          >
                            {exp.title}
                          </h3>
                          <p
                            className="font-semibold mb-2"
                            style={{ color: theme.accent }}
                          >
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Calendar
                          className="w-4 h-4"
                          style={{ color: theme.textSecondary }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: theme.textSecondary }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      <p
                        className="leading-relaxed"
                        style={{ color: theme.textSecondary }}
                      >
                        {exp.description}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section - NEW */}
        <section id="education" className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-5xl font-bold mb-16 text-center animate-fade-in"
              style={{ color: theme.text }}
            >
              Education
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div
                className="absolute left-8 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: theme.border }}
              />

              {/* Education Items */}
              <div className="space-y-12">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-20 animate-slide-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Timeline Dot */}
                    <div
                      className="absolute left-6 w-5 h-5 rounded-full border-4"
                      style={{
                        backgroundColor: theme.accent,
                        borderColor: theme.bg
                      }}
                    />

                    {/* Content Card */}
                    <Card
                      className="backdrop-blur-md border transition-all duration-300 p-6 hover:shadow-xl group"
                      style={{
                        backgroundColor: `${theme.card}cc`,
                        borderColor: theme.border
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = theme.accent;
                        e.currentTarget.style.transform = "translateX(8px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = theme.border;
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <GraduationCap
                          className="w-5 h-5 mt-1 flex-shrink-0"
                          style={{ color: theme.accent }}
                        />
                        <div>
                          <h3
                            className="text-xl font-bold mb-1"
                            style={{ color: theme.text }}
                          >
                            {edu.degree}
                          </h3>
                          <p
                            className="font-semibold mb-2"
                            style={{ color: theme.accent }}
                          >
                            {edu.institution}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Calendar
                          className="w-4 h-4"
                          style={{ color: theme.textSecondary }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: theme.textSecondary }}
                        >
                          {edu.period}
                        </span>
                      </div>

                      <p
                        className="leading-relaxed mb-2"
                        style={{ color: theme.textSecondary }}
                      >
                        {edu.description}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <BookOpen
                          className="w-4 h-4"
                          style={{ color: theme.accent }}
                        />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: theme.accent }}
                        >
                          {edu.grade}
                        </span>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2
                className="text-5xl font-bold mb-4 animate-fade-in"
                style={{ color: theme.text }}
              >
                Featured Projects
              </h2>
              <p
                className="text-lg"
                style={{ color: theme.textSecondary }}
              >
                Total Projects: <span style={{ color: theme.accent, fontWeight: 600 }}>{TOTAL_PROJECTS}</span> |
                Live Projects: <span style={{ color: theme.accent, fontWeight: 600 }}>{projects.filter(p => p.isLive).length}</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.title}
                  className="project-card backdrop-blur-md border overflow-hidden group transition-all duration-500 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    transformStyle: "preserve-3d",
                    backgroundColor: `${theme.card}cc`,
                    borderColor: theme.border
                  }}
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
                    card.style.borderColor = theme.accent;
                    card.style.boxShadow = `0 20px 60px ${theme.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
                    e.currentTarget.style.borderColor = theme.border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="relative h-64 overflow-hidden">
                    {project.isLive && (
                      <div
                        className="absolute top-4 right-4 z-10 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse"
                        style={{
                          backgroundColor: "#10b981",
                          color: "#ffffff"
                        }}
                      >
                        🟢 LIVE
                      </div>
                    )}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t opacity-60 group-hover:opacity-80 transition-opacity"
                      style={{
                        background: `linear-gradient(to top, ${theme.bg}, ${theme.bg}80, transparent)`
                      }}
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3
                      className="text-2xl font-bold transition-colors"
                      style={{ color: theme.text }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ color: theme.textSecondary }}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full border transition-all"
                          style={{
                            backgroundColor: `${theme.accent}10`,
                            color: theme.accent,
                            borderColor: theme.border
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1 border transition-all hover:scale-105"
                        asChild
                        style={{
                          borderColor: theme.accent,
                          color: theme.accent,
                          backgroundColor: `${theme.accent}10`
                        }}
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border transition-all hover:scale-105"
                        asChild
                        style={{
                          borderColor: theme.accent,
                          color: theme.accent,
                          backgroundColor: `${theme.accent}10`
                        }}
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            {/* Heading with Watermark */}
            <div className="relative mb-12 text-center">
              {/* Watermark Text */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
                style={{
                  fontSize: "clamp(80px, 15vw, 200px)",
                  fontWeight: 900,
                  color: `${theme.textSecondary}10`,
                  lineHeight: 1,
                  opacity: 0.3
                }}
              >
                Contact
              </div>

              {/* Main Heading */}
              <h2
                className="text-5xl md:text-6xl font-bold mb-4 relative z-10 animate-fade-in"
                style={{ color: theme.text }}
              >
                Contact Me
              </h2>

              <p
                className="text-lg relative z-10"
                style={{ color: theme.textSecondary }}
              >
                Below are the details to reach out to me!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {/* Address Card */}
              <div className="flex flex-col items-center text-center animate-slide-up">
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: `${theme.card}dd`,
                    border: `2px solid ${theme.border}`,
                    boxShadow: `0 10px 40px ${theme.accent}20`
                  }}
                >
                  <svg
                    className="w-12 h-12"
                    style={{ color: theme.accent }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: theme.text }}
                >
                  ADDRESS
                </h3>
                <p
                  className="text-base"
                  style={{ color: theme.textSecondary }}
                >
                  Lucknow, India
                </p>
              </div>

              {/* Contact Number Card */}
              <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: `${theme.card}dd`,
                    border: `2px solid ${theme.border}`,
                    boxShadow: `0 10px 40px ${theme.accent}20`
                  }}
                >
                  <svg
                    className="w-12 h-12"
                    style={{ color: theme.accent }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: theme.text }}
                >
                  CONTACT NUMBER
                </h3>
                <p
                  className="text-base"
                  style={{ color: theme.textSecondary }}
                >
                  +91 7705939987
                </p>
              </div>

              {/* Email Address Card */}
              <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: `${theme.card}dd`,
                    border: `2px solid ${theme.border}`,
                    boxShadow: `0 10px 40px ${theme.accent}20`
                  }}
                >
                  <svg
                    className="w-12 h-12"
                    style={{ color: theme.accent }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: theme.text }}
                >
                  EMAIL ADDRESS
                </h3>
                <p
                  className="text-base break-all"
                  style={{ color: theme.textSecondary }}
                >
                  Princekumarsingh167@gmail.com
                </p>
              </div>

              {/* Download Resume Card */}
              <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <button
                  onClick={handleResumeDownload}
                  className="w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 cursor-pointer"
                  style={{
                    backgroundColor: `${theme.card}dd`,
                    border: `2px solid ${theme.border}`,
                    boxShadow: `0 10px 40px ${theme.accent}20`
                  }}
                >
                  <svg
                    className="w-12 h-12"
                    style={{ color: theme.accent }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </button>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: theme.text }}
                >
                  DOWNLOAD RESUME
                </h3>
                <button
                  onClick={handleResumeDownload}
                  className="text-base hover:underline transition-all"
                  style={{ color: theme.textSecondary }}
                >
                  resumelink
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-12 px-6 border-t backdrop-blur-sm"
          style={{ borderColor: theme.border }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Technologies Used */}
            <div className="mb-8">
              <h3
                className="text-xl font-semibold text-center mb-6"
                style={{ color: theme.textSecondary }}
              >
                Technologies & Skills
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {allTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg border transition-all text-sm font-medium hover:scale-105"
                    style={{
                      backgroundColor: `${theme.accent}10`,
                      color: theme.accent,
                      borderColor: theme.border
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = theme.accent;
                      e.currentTarget.style.backgroundColor = `${theme.accent}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = theme.border;
                      e.currentTarget.style.backgroundColor = `${theme.accent}10`;
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div
              className="text-center pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <p style={{ color: theme.textSecondary }}>
                © 2025 Prince Kumar Singh. Built with{" "}
                <span style={{ color: theme.accent }}> curiosity</span> and{" "}
                <span style={{ color: theme.accent }}>code</span>.
              </p>
            </div>
          </div>
        </footer>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-progress-fill {
          animation: progress-fill 2s ease-out forwards;
        }
        @keyframes progress-fill {
          from { width: 0; }
        }
      `}</style>
    </div>
  );
}