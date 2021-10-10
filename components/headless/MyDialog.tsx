import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
  showDialog: boolean,
  closeDialog: () => void,
}

const MyDialog = ({ showDialog, closeDialog, }: Props) => {

  return (
    <Transition
      show={showDialog}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog className="fixed z-10 inset-0 overflow-y-auto" open={showDialog} onClose={() => closeDialog()}>
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded max-w-sm mx-auto py-4 px-6">
            <Dialog.Title className="text-2xl text-center">Deactivate account</Dialog.Title>
            <Dialog.Description className="mt-8 font-bold">
              This will permanently deactivate your account
            </Dialog.Description>

            <p className="mt-1 leading-relaxed">
              Are you sure you want to deactivate your account? All of your data will
              be permanently removed.This action cannot be undone.
            </p>
            <div className="flex space-x-4 justify-center mt-8">
              <button className="bg-red-400 w-24 rounded-md py-1 px-2 text-white focus:outline-none focus:ring-1 focus:ring-offset-white focus:ring-offset-1  focus:ring-red-400" onClick={() => closeDialog()}>Deactivate</button>
              <button className="border border-black w-24 rounded-md py-1 px-2 text-black focus:outline-none focus:bg-gray-500 focus:text-white" onClick={() => closeDialog()}>Cancel</button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default MyDialog