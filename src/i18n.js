import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to our restaurant!",
          sidebar: "Menu",
          logout: "Logout",
        },
      },
      ar: {
        translation: {
          welcome: "مرحبًا بكم في مطعمنا!",
          sidebar: "القائمة",
          logout: "تسجيل الخروج",
          userManagement: "إدارة المستخدم",
          supermarket: "سوبر ماركت",
          payments: "المدفوعات والتمويل",
          notification: "إشعار",
          descUserManagement: "إدارة جميع المستخدمين وصلاحياتهم في النظام.",
          descSuperMarket: "تتبع وإدارة عمليات السوبر ماركت بسهولة.",
          descPayments: "إدارة المدفوعات والفواتير والمهام المالية.",
          descNotification: "تحقق من جميع الإشعارات والرد عليها هنا.",
          descLogout: "يمكنك تسجيل الخروج بأمان من هنا."
        },
      },
      he: {
        translation: {
          welcome: "ברוכים הבאים למסעדה שלנו!",
          sidebar: "תפריט",
          logout: "התנתקות",
          userManagement: "ניהול משתמשים",
          supermarket: "סופרמרקט",
          payments: "תשלומים ופיננסים",
          notification: "התראה",
          descUserManagement: "נהל את כל המשתמשים והגישה שלהם במערכת.",
          descSuperMarket: "עקוב ונהל בקלות את פעולות הסופרמרקט.",
          descPayments: "טפל בתשלומים, חשבוניות ומשימות פיננסיות.",
          descNotification: "בדוק והגב לכל ההתראות כאן.",
          descLogout: "באפשרותך להתנתק בצורה מאובטחת מכאן."
        },
      },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
