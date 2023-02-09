import React from 'react';
import {render} from '@testing-library/react';
import UserListComp from "../components/UserListComp";


describe('UserListComp', () => {
    test('renders userListComp component', () => {
        render(<UserListComp/>);
    });
});

