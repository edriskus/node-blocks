import * as i18n from "i18next";
import * as LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: {
        "common": {
          "title": "Node::Blocks",
          "home": "Home",
          "features": "Features",
          "pricing": "Pricing",
          "dashboard": "Dashboard",
          "jobs": "Jobs",
          "algs": "Algorithms",
          "learn_more": "Learn more",
          "coming_soon": "Coming soon!",
          "footer": "&copy;ergėbė factory, <b>2018</b>",
          "no_data": "No data to show",
          "submit": "Submit",
          "close": "Close",
          "back": "Back",
          "cancel": "Cancel",
          "next": "Next",
          "done": "Done",
          "save": "Save",
          "remove": "Remove",
          "save_success": "Saved successfuly!",
          "all_good": "All good!",
          "page_not_found": "The page you've been looking for does not exist."
        },
        "home": {
          "title": "SSMD computing for the Web",
          "tagline": "a cluster control toolkit for computing on distributed web nodes.",
          "description": "NodeBlocks utilizes modern Web technologies to harvest the power of a truly distributed Internet that we all live in."
        },
        "features": {
          "description": "Our platform is a friendly, free to use high-performance computing toolkit built for the modern Web.",
          "modern": {
            "title": "Modern",
            "description": "Some of the technologies that we use:<ul><li>HTML5 web workers</li><li>Node.js v9</li></ul>"
          },
          "free": {
            "title": "Free to use",
            "description": "Node::Blocks is <b>free</b> to use for 1 concurrent job with up to 15 private users (runners)."
          },
          "friendly": {
            "title": "Friendly",
            "description": "A computing job can literally be started with a single push of a button."
          }
        },
        "pricing": {
          "description": "Node::Blocks is <b>free</b> to use for 1 concurrent job with up to 15 private users (runners).",
          "basic": {
            "title": "Basic",
            "description": "As a <b>Basic</b> user, you get:<ul><li>1 concurrent job</li><li>Up to 15 private users in a project</li><li>15+ predefined algorithms</li>"
          },
          "premium": {
            "title": "Premium",
            "description": "As a <b>Premium</b> user, you get:<ul><li>5 concurrent jobs</li><li>Unlimited users in a project</li><li>50+ predefined algorithms</li><li><b>Public</b> jobs</li>"
          }
        },
        "dashboard": {
          "tagline": "Welcome, {{ username }}!",
          "activity": "Activity"
        },
        "algs": {
          "create_new": "Create an algorithm",
          "algorithm": "Algorithm",
          "title": "Title",
          "description": "Description",
          "inputs": "Inputs",
          "results": "Results",
          "worker": "Worker",
          "fa": "Icon",
          "enter_title": "Enter title",
          "enter_description": "Enter description",
          "enter_inputs": "Enter inputs",
          "enter_results": "Enter results",
          "enter_worker": "Enter worker",
          "enter_fa": "fas fa-box",
          "block_builder_code": "Block builder",
          "client_code": "Compute module",
          "resolve_code": "Finalizer",
          "backup": "Backup"
        },
        "jobs": {
          "job": "Job",
          "start_new": "Start new job",
          "create": "New job",
          "recent_jobs": "Recent jobs",
          "select_algorithm": "Select an algorithm",
          "configure": "Configure",
          "description": "Description",
          "blocks": "Blocks",
          "running_blocks": "Running",
          "idle_blocks": "Idle",
          "finished_blocks": "Finished",
          "status": "Status"
        },
        "auth": {
          "enter": "Enter",
          "join": "Join",
          "sign_me_up": "Sign me up!",
          "email": "Email address",
          "enter_email": "Enter your email",
          "password": "Password",
          "enter_password": "Enter your password"
        },
        "err": {
          "invalid": {
            "email": "This does not look like an email",
            "password": "Password must be ...",
            "title": "Title is required",
            "description": "Description is required",
            "inputs": "Inputs are required",
            "results": "Results are required",
            "worker": "Worker is required",
            "fa": "There is no such FontAwesome icon"
          }
        },
        "help": {
          "builder_code": "<div style=\"color: #657b83; background-color: #fdf6e3; font-family: 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'; font-weight: normal; font-size: 14px; line-height: 19px; white-space: pre;\">&nbsp;<\/div><p>Code that is used to build blocks. There are 2 global variables: id and job<\/p><p>id: number;<\/p><p>job:{<br\/>&nbsp;&nbsp; title:{type: 'string', required: true},<br\/>&nbsp;&nbsp; type:{model: 'algorithm', required: true},<br\/>&nbsp;&nbsp; description:{type: 'string'},<br\/>&nbsp;&nbsp; inputs:{type: 'json'},<br\/>&nbsp;&nbsp; results:{type: 'json'},<br\/>};<\/p><p>The code <strong>must<\/strong> return a value that is a block for a given id.<\/p>",
          "client_code": ""
        }     
      }
    }
  },
  fallbackLng: "en",
  debug: true,

  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: '.',

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: "."
  },

  react: {
    wait: true
  }
});

export default i18n;
