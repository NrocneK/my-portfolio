"use strict";


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const dictionary = {

    vi: {

        "nav.home": "Trang chủ",
        "nav.about": "Giới thiệu",
        "nav.projects": "Dự án",
        "nav.skills": "Kỹ năng",
        "nav.contact": "Liên hệ",


        "hero.available":
            "Sẵn sàng cho cơ hội Junior Developer",

        "hero.eyebrow":
            "JUNIOR FULLSTACK DEVELOPER",

        "hero.title":
            "Xây dựng phần mềm từ những vấn đề thực tế.",

        "hero.description":
            "Xuất phát từ nền tảng Điện tử & Viễn thông, kinh nghiệm vận hành kho và quá trình tự học phát triển phần mềm.",

        "hero.projects":
            "Xem dự án",

        "hero.contact":
            "Liên hệ",

        "hero.building":
            "Hệ thống Fullstack",

        "hero.learning":
            "Mỗi ngày",


        "about.eyebrow":
            "GIỚI THIỆU",

        "about.title":
            "Từ vận hành đến phát triển phần mềm.",

        "about.description":
            "Hành trình phát triển của tôi bắt đầu từ nhu cầu thực tế: hiểu rõ và cải thiện những hệ thống xung quanh mình.",

        "about.educationLabel":
            "HỌC VẤN",

        "about.educationTitle":
            "Điện tử & Viễn thông",

        "about.educationText":
            "Nền tảng kỹ thuật giúp tôi phát triển tư duy hệ thống, hiểu về mạng và tiếp cận vấn đề theo hướng kỹ thuật.",

        "about.workLabel":
            "KINH NGHIỆM",

        "about.workTitle":
            "Vận hành kho",

        "about.workText":
            "Kinh nghiệm thực tế với tồn kho, nhập hàng, xuất hàng và các quy trình vận hành.",

        "about.developmentLabel":
            "PHÁT TRIỂN",

        "about.developmentTitle":
            "Tự học phát triển phần mềm",

        "about.developmentText":
            "Việc chuyển những vấn đề thực tế trong công việc thành các dự án phần mềm trở thành nền tảng cho quá trình chuyển hướng sang lập trình.",

        "about.highlightLabel":
            "TƯ DUY PHÁT TRIỂN",

        "about.highlightTitle":
            "Xây dựng. Hiểu rõ. Cải thiện.",

        "about.highlightText":
            "Tôi ưu tiên hiểu vấn đề trước, sau đó thiết kế hệ thống dựa trên quy trình thực tế thay vì xây dựng tính năng mà không có bối cảnh.",


        "projects.eyebrow":
            "DỰ ÁN TIÊU BIỂU",

        "projects.title":
            "WMS Pro",

        "projects.description":
            "Hệ thống quản lý kho được xây dựng xoay quanh các quy trình vận hành thực tế.",

        "projects.wms.type":
            "FULLSTACK APPLICATION",

        "projects.wms.description":
            "Hệ thống quản lý kho fullstack được thiết kế dựa trên quy trình vận hành thực tế, theo dõi tồn kho và phân quyền người dùng.",

        "projects.wms.feature1Title":
            "Tồn kho",

        "projects.wms.feature1Text":
            "Theo dõi tồn kho nhiều kho",

        "projects.wms.feature2Title":
            "Xác thực",

        "projects.wms.feature2Text":
            "JWT access và refresh",

        "projects.wms.feature3Title":
            "Vận hành",

        "projects.wms.feature3Text":
            "Picking slip và Excel",

        "projects.wms.feature4Title":
            "Audit",

        "projects.wms.feature4Text":
            "Theo dõi hoạt động",

        "projects.github":
            "GitHub",

        "projects.demo":
            "Xem Demo",

        "projects.githubFrontend":
            "GitHub — Frontend",

        "projects.githubBackend":
            "GitHub — Backend",


        "otherProjects.eyebrow":
            "CÁC DỰ ÁN KHÁC",

        "otherProjects.title":
            "Những hệ thống tôi đã xây dựng",

        "otherProjects.communix":
            "Nền tảng giao tiếp realtime với xác thực, messaging bằng Socket.IO và WebRTC.",

        "otherProjects.hrms":
            "Hệ thống quản lý nhân sự với phân quyền và các quy trình quản lý nhân viên.",

        "otherProjects.shop":
            "Nền tảng thương mại điện tử bán túi xách: mua hàng, đặt hàng, thanh toán MoMo/VietQR và trang quản trị.",


        "skills.eyebrow":
            "TECHNICAL SKILLS",

        "skills.title":
            "Các công nghệ tôi sử dụng để xây dựng hệ thống.",

        "skills.frontend":
            "Frontend",

        "skills.backend":
            "Backend",

        "skills.database":
            "Database",

        "skills.tools":
            "Tools",


        "experience.eyebrow":
            "KINH NGHIỆM",

        "experience.title":
            "Kinh nghiệm & Học vấn",

        "experience.work.period":
            "Kinh nghiệm thực tế",

        "experience.work.title":
            "Vận hành kho",

        "experience.work.text":
            "Kinh nghiệm thực tế với tồn kho, quy trình nhập/xuất, phối hợp vận hành và giải quyết các vấn đề trong công việc.",

        "experience.education.period":
            "Học vấn",

        "experience.education.title":
            "Điện tử & Viễn thông",

        "experience.education.text":
            "Cử nhân Điện tử Viễn thông, hệ Vừa Học Vừa Làm tại HCMUT — vừa đi làm vừa hoàn thành chương trình học trong 6 năm.",

        "experience.present":
            "Hiện tại",

        "experience.selfTaught.period":
            "Tự học lập trình",

        "experience.selfTaught.title":
            "Tự học phát triển phần mềm",

        "experience.selfTaught.text":
            "Bắt đầu từ VBA để tự động hoá báo cáo kho sau khi đảm nhận vai trò quản lý, sau đó chuyển dần sang lập trình Web App với React, Node.js và MySQL.",


        "contact.eyebrow":
            "LIÊN HỆ",

        "contact.title":
            "Cùng xây dựng một sản phẩm hữu ích.",

        "contact.description":
            "Có dự án, cơ hội hoặc vấn đề kỹ thuật muốn trao đổi? Hãy gửi tin nhắn cho tôi.",

        "contact.cvLabel":
            "CURRICULUM VITAE",

        "contact.cvTitle":
            "Xem CV của tôi",

        "contact.cvVi":
            "CV — VI",

        "contact.cvEn":
            "CV — EN",

        "contact.formLabel":
            "GỬI TIN NHẮN",

        "contact.formTitle":
            "Hãy cho tôi biết bạn đang làm gì.",

        "contact.name":
            "Họ tên",

        "contact.namePlaceholder":
            "Nhập họ tên",

        "contact.email":
            "Email",

        "contact.emailPlaceholder":
            "your@email.com",

        "contact.subject":
            "Tiêu đề",

        "contact.subjectPlaceholder":
            "Bạn muốn trao đổi về điều gì?",

        "contact.message":
            "Nội dung",

        "contact.messagePlaceholder":
            "Nhập nội dung tin nhắn...",

        "contact.send":
            "Gửi tin nhắn",


        "footer.role":
            "Junior Fullstack Developer",

        "footer.credit":
            "· Xây dựng bởi Ngô Minh Nhựt"
    },


    en: {

        "nav.home": "Home",
        "nav.about": "About",
        "nav.projects": "Projects",
        "nav.skills": "Skills",
        "nav.contact": "Contact",


        "hero.available":
            "Open to Junior Developer opportunities",

        "hero.eyebrow":
            "JUNIOR FULLSTACK DEVELOPER",

        "hero.title":
            "Building software from real operational problems.",

        "hero.description":
            "An Electronics & Telecommunications background combined with warehouse operations experience and self-taught software development.",

        "hero.projects":
            "View Projects",

        "hero.contact":
            "Contact Me",

        "hero.building":
            "Fullstack systems",

        "hero.learning":
            "Every day",


        "about.eyebrow":
            "ABOUT",

        "about.title":
            "From operations to software engineering.",

        "about.description":
            "My development journey started from a practical need: understanding and improving the systems around me.",

        "about.educationLabel":
            "EDUCATION",

        "about.educationTitle":
            "Electronics & Telecommunications",

        "about.educationText":
            "A technical foundation that developed my systems thinking, networking knowledge and engineering problem-solving.",

        "about.workLabel":
            "EXPERIENCE",

        "about.workTitle":
            "Warehouse Operations",

        "about.workText":
            "Hands-on experience with inventory, inbound, outbound and operational workflows.",

        "about.developmentLabel":
            "DEVELOPMENT",

        "about.developmentTitle":
            "Self-taught Software Development",

        "about.developmentText":
            "Turning real operational problems into software projects became the foundation of my transition into development.",

        "about.highlightLabel":
            "DEVELOPMENT PHILOSOPHY",

        "about.highlightTitle":
            "Build it. Understand it. Improve it.",

        "about.highlightText":
            "I focus on understanding the problem first, then designing the system around the actual workflow instead of building features without context.",


        "projects.eyebrow":
            "SELECTED PROJECT",

        "projects.title":
            "WMS Pro",

        "projects.description":
            "A warehouse management system built around real operational workflows.",

        "projects.wms.type":
            "FULLSTACK APPLICATION",

        "projects.wms.description":
            "A fullstack warehouse management system designed around practical warehouse operations, inventory tracking and role-based workflows.",

        "projects.wms.feature1Title":
            "Inventory",

        "projects.wms.feature1Text":
            "Multi-warehouse stock tracking",

        "projects.wms.feature2Title":
            "Authentication",

        "projects.wms.feature2Text":
            "JWT access and refresh flow",

        "projects.wms.feature3Title":
            "Operations",

        "projects.wms.feature3Text":
            "Picking slips and Excel workflows",

        "projects.wms.feature4Title":
            "Audit",

        "projects.wms.feature4Text":
            "Operational activity tracking",

        "projects.github":
            "GitHub",

        "projects.demo":
            "Live Demo",

        "projects.githubFrontend":
            "GitHub — Frontend",

        "projects.githubBackend":
            "GitHub — Backend",


        "otherProjects.eyebrow":
            "OTHER PROJECTS",

        "otherProjects.title":
            "Systems I've built",

        "otherProjects.communix":
            "Realtime communication platform with authentication, Socket.IO messaging and WebRTC.",

        "otherProjects.hrms":
            "Human resource management system with role-based access and employee workflows.",

        "otherProjects.shop":
            "E-commerce platform for bags: shopping, ordering, MoMo/VietQR payments and an admin dashboard.",


        "skills.eyebrow":
            "TECHNICAL SKILLS",

        "skills.title":
            "Tools I use to build systems.",

        "skills.frontend":
            "Frontend",

        "skills.backend":
            "Backend",

        "skills.database":
            "Database",

        "skills.tools":
            "Tools",


        "experience.eyebrow":
            "EXPERIENCE",

        "experience.title":
            "Experience & Education",

        "experience.work.period":
            "Professional Experience",

        "experience.work.title":
            "Warehouse Operations",

        "experience.work.text":
            "Practical experience with inventory, inbound/outbound workflows, coordination and operational problem solving.",

        "experience.education.period":
            "Education",

        "experience.education.title":
            "Electronics & Telecommunications",

        "experience.education.text":
            "Bachelor's in Electronics & Telecommunications, work-study program at HCMUT — completed over 6 years while working full-time.",

        "experience.present":
            "Present",

        "experience.selfTaught.period":
            "Self-Taught Development",

        "experience.selfTaught.title":
            "Self-Taught Software Development",

        "experience.selfTaught.text":
            "Started with VBA to automate warehouse reports after taking on a management role, then gradually moved into web app development with React, Node.js and MySQL.",


        "contact.eyebrow":
            "CONTACT",

        "contact.title":
            "Let's build something useful.",

        "contact.description":
            "Have a project, opportunity or technical problem to discuss? Send me a message.",

        "contact.cvLabel":
            "CURRICULUM VITAE",

        "contact.cvTitle":
            "View my CV",

        "contact.cvVi":
            "CV — VI",

        "contact.cvEn":
            "CV — EN",

        "contact.formLabel":
            "SEND A MESSAGE",

        "contact.formTitle":
            "Tell me what you're working on.",

        "contact.name":
            "Name",

        "contact.namePlaceholder":
            "Your name",

        "contact.email":
            "Email",

        "contact.emailPlaceholder":
            "your@email.com",

        "contact.subject":
            "Subject",

        "contact.subjectPlaceholder":
            "What would you like to discuss?",

        "contact.message":
            "Message",

        "contact.messagePlaceholder":
            "Write your message...",

        "contact.send":
            "Send Message",


        "footer.role":
            "Junior Fullstack Developer",

        "footer.credit":
            "· Designed & built by Ngô Minh Nhựt"
    }

};