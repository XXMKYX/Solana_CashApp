import { ClockIcon, CurrencyDollarIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../utils/classNames'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { truncate } from '../../utils/string'
require('@solana/wallet-adapter-react-ui/styles.css')

const NavMenu = ({ connected, publicKey }) => {
    const menus = [
        {
            icon: ClockIcon,
            item: 'Activity',
            current: true,
        },
        {
            icon: CurrencyDollarIcon,
            item: 'Cash Card',
            current: false,
        },
        {
            icon: Cog6ToothIcon,
            item: 'Settings',
            current: false,
        },
    ]

    return (
        <nav className="flex flex-1 items-center justify-center">
            <ul className="flex flex-col space-y-10">
                {menus.map(({ icon, item, current, action }, i) => (
                    <NavMenuItem key={i} Icon={icon} item={item} current={current} action={action} />
                ))}
                <li>
                    <WalletMultiButton className='hover:text-pink-500 bg-gradient-to-r from-indigo-800 via-purple-600 to-violet-600'>
                    </WalletMultiButton> 
                    {/*<button className="flex space-x-3">
                        <UserCircleIcon style={{ height: 24, width: 24, color: '#00e7ff' }} />
                        <span className="text-sm font-semibold text-[#00e7ff]">{connected ? truncate(publicKey.toString()) : 'Connect Wallet'}</span>
                    </button>*/}
                </li>
            </ul>
        </nav >
    )
}

const NavMenuItem = ({ Icon, item, current, action }) => {
    return (
        <li onClick={action} className={classNames('flex cursor-pointer space-x-3 transition-all hover:text-pink-500', current ? 'text-white' : 'text-[#fff]', 'font-semibold')}>
            <Icon className="h-6 w-6 " />
            <span>{item}</span>
        </li>
    )
}

export default NavMenu
