import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
  showDialog: boolean,
  closeDialog: () => void,
  title: string,
  subtitle: string,
  desc: string,
  overlay?: boolean,
}

const MyDialog = ({ showDialog, closeDialog, desc, subtitle, title, overlay = true }: Props) => {

  return (
    <Transition
      show={showDialog}
      enter="transition duration-100 ease-out delay-500"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog className="fixed z-10 inset-0 overflow-y-auto" open={showDialog} onClose={() => closeDialog()}>
        <div className="flex items-center justify-center min-h-screen">
          {overlay && <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />}
          <div className="shadow-2xl relative bg-white rounded max-w-sm mx-auto py-4 px-6">
            <Dialog.Title className="text-2xl text-center">{title}</Dialog.Title>
            <Dialog.Description className="mt-8 font-bold">
              {subtitle}
            </Dialog.Description>
            <p className="mt-1 leading-relaxed">
              {desc}
            </p>
            <div className="flex space-x-4 justify-center mt-8">
              {/* <button className="bg-red-400 w-24 rounded-md py-1 px-2 text-white focus:outline-none focus:ring-1 focus:ring-offset-white focus:ring-offset-1  focus:ring-red-400" onClick={() => closeDialog()}>Deactivate</button> */}
              <button className="border border-black rounded-md py-2 px-4 focus:outline-none" onClick={() => closeDialog()}>Back to product</button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default MyDialog