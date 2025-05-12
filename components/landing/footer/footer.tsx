export function Footer(){
    return(
        <footer className="bg-white text-center py-4 border-t">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} ColdMailer. All rights reserved. | Follow us on{" "}
          <a
            href="https://x.com/rohhaan12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </a>
        </p>
    </footer>
    )
}