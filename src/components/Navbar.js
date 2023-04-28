import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Container, Menu, MenuItem, MenuMenu } from "semantic-ui-react";

export default function Navbar() {
  const router = useRouter();
  return (
    <>
      <Menu>
        <Container>
          <MenuItem>
            <Link href={"/"} passHref={true}>
              <h2>Logo</h2>
            </Link>
          </MenuItem>
          <MenuMenu position="right">
            <MenuItem>
              <Button
                primary
                size="mini"
                onClick={() => router.push("/task/new")}
              >
                New Task
              </Button>
            </MenuItem>
          </MenuMenu>
        </Container>
      </Menu>
    </>
  );
}
