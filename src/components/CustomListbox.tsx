
import { Listbox } from '@headlessui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'

type CustomListboxProps = {
    selectedValue: string;
    setSelectedValue: (arg0: string) => void;
    options: string[];
};

const CustomListbox = (props: CustomListboxProps) => {
    return (
        <Listbox
            value={props.selectedValue}
            onChange={(e) => props.setSelectedValue(e)}
        >
            <Listbox.Button className="listbox-button d-flex justify-content-between align-items-center">
                {props.selectedValue}
                <FontAwesomeIcon icon={faCircleChevronDown} className="listbox-icon" />
            </Listbox.Button>

            <Listbox.Options className="listbox-option-group mx-0 py-2 my-2">
                {
                    props.options.map(value => (
                        <Listbox.Option
                            className="listbox-option-item"
                            key={value}
                            value={value}
                        >
                            {({ active, selected }) => (
                                <div
                                    className={`${active ? 'listbox-option-item-content listbox-option-item-content-selected' : 'listbox-option-item-content'
                                        }
                                                            `}
                                >
                                    {value}
                                    {selected && <FontAwesomeIcon icon={faCheck} className="listbox-icon ms-2" />}
                                </div>
                            )}
                        </Listbox.Option>
                    ))
                }
            </Listbox.Options>
        </Listbox>
    )
};

export default CustomListbox;