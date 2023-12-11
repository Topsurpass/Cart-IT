import { Menu as MenuIcon } from 'lucide-react';
import { X } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';

export default function MyDropdown({ children }) {
    return (
        <Popover className="relative z-50 flex w-[50%] flex-col self-center">
            {({ open }) => (
                <>
                    <Popover.Button className="ml-auto">
                        {open ? <X /> : <MenuIcon />}
                    </Popover.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Popover.Panel
                            as='nav'
                            className="absolute z-10 mt-[28px] w-[100%]"
                        >
                            {children}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
