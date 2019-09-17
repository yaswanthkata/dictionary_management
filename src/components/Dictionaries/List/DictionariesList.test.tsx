import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DictionariesList, { IDictionariesListProps } from './index';
import { dictionaries } from '../../../mock-data';

configure({ adapter: new Adapter() });


const props: IDictionariesListProps = {
    dictionaries: dictionaries,
    selectedDictionary: null,
    onSelect: jest.fn(),
    onDelete: jest.fn()
}

let componentWrapper: ShallowWrapper<React.Component>;

beforeEach(() => {
    componentWrapper = shallow(<DictionariesList {...props} />);
});


it('should render dictionaries list component correctly', () => {
    expect(componentWrapper).toMatchSnapshot();
});

it('should render one <ul> element', () => {
    expect(componentWrapper.find('ul')).toHaveLength(1);
});

it("should render  a list of dictionaries", () => {
    const listItems = componentWrapper.find('li').length;

    expect(listItems).toEqual(2);
});
