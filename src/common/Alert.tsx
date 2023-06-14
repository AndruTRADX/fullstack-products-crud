import { Alert } from '@/hooks/useAlert'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface Props {
  alert: Alert
  handleClose: () => void
}

const Alert = (props: Props) => {
  const { alert, handleClose } = props
  if (alert?.active && alert?.autoClose) {
    setTimeout(() => {
      handleClose()
    }, 9000)
  }

  return (
    <>
      {alert?.active && (
        <div id="dismiss-alert" className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-purple-50 border border-purple-200 rounded-md p-4" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-4 w-4 text-purple-400 mt-0.5" />
            </div>
            <div className="ml-3">
              <div className="text-sm text-purple-800 font-medium">
                {alert.message}
              </div>
            </div>
            <div className="pl-3 ml-auto">
              <div className="-mx-1.5 -my-1.5">
                <button type="button" className="inline-flex bg-purple-50 rounded-md p-1.5 text-purple-500 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-50 focus:ring-purple-600" data-hs-remove-element="#dismiss-alert">
                  <span className="sr-only">Dismiss</span>
                  <XCircleIcon className="h-4 w-4" onClick={() => handleClose()} />
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Alert