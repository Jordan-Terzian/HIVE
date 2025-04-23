import React from 'react';
import { render } from '@testing-library/react';
import ImportantPages from '../../components/molecules/importantPages';
import { MemoryRouter } from 'react-router-dom'; // To provide a routing context

describe('ImportantPages', () => {

  it('renders the ImportantPages component', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <ImportantPages />
      </MemoryRouter>
    );

    // Check for links
    expect(getByText('Children Protection Information').closest('a')).toHaveAttribute('href', 'https://www.health.nsw.gov.au/parvan/childprotect/Pages/default.aspx#:~:text=Contact%20the%20Community%20Services%20Child,the%20online%20Mandatory%20Reporter%20Guide.');
    expect(getByText('Working with Children Check').closest('a')).toHaveAttribute('href', 'https://www.service.nsw.gov.au/transaction/apply-for-a-working-with-children-check');
    expect(getByText('Hive Terms of Services').closest('a')).toHaveAttribute('href', '/terms-conditions');
  });

});
