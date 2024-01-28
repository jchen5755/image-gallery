"use client";

import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <Navbar
            bg="primary"
            variant="dark"
            sticky="top"
            expand="sm"
            collapseOnSelect
        >
            <Container>
                <Navbar.Brand as={Link} href="/">
                    NextJS 14.1 Image Gallery
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link
                            as={Link}
                            href="/hello"
                            active={pathname === "/hello"}
                        >
                            Hello
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
