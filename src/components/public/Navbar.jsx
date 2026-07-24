import React from 'react';
import NavbarCleint from './NavbarCleint';
import { getSessionInServer } from '@/lib/api/core/session';

const Navbar = async () => {

  const user = await getSessionInServer()

  return (
    <NavbarCleint user={user}/>
  );
};

export default Navbar;