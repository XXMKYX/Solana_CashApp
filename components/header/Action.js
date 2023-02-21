const Action = ({ setModalOpen }) => {
    const onNewTransaction = () => {
        setModalOpen(true)
    }

    return (
        <div>
            <button onClick={onNewTransaction} className="w-full rounded-lg bg-[#cb00ed] py-3 hover:bg-opacity-70">
                <span className="font-medium text-white">New</span>
            </button>
        </div>
    )
}

export default Action
