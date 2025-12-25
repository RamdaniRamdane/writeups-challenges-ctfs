from http.server import HTTPServer, SimpleHTTPRequestHandler


class CompatibleHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
    }

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()


if __name__ == "__main__":
    HTTPServer(("0.0.0.0", 8000), CompatibleHandler).serve_forever()
