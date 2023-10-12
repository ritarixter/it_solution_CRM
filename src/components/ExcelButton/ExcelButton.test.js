import React from 'react';
import renderer from 'react-test-renderer';

import { ExcelButton } from './ExcelButton';

it('ExcelButton рендерится без ошибок', () => {
  const tree = renderer
    .create(<ExcelButton text="Импорт" onClick={()=>{}} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 