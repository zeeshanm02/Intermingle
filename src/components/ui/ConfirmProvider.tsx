import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react"
import { createPortal } from "react-dom"
import ConfirmDialog from "./ConfirmDialog"

export type ConfirmOptions = {
  title: string
  message?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
}

type ConfirmFn = (opts: ConfirmOptions) => Promise<boolean>

const ConfirmContext = createContext<ConfirmFn | null>(null)

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [opts, setOpts] = useState<ConfirmOptions | null>(null)
  const [resolver, setResolver] = useState<((v: boolean) => void) | null>(null)

  const confirm: ConfirmFn = useCallback((options: ConfirmOptions) => {
    setOpts(options)
    setOpen(true)
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve)
    })
  }, [])

  const handleClose = useCallback(
    (val: boolean) => {
      if (busy) return
      setOpen(false)
      setBusy(false)
      setOpts(null)
      resolver?.(val)
      setResolver(null)
    },
    [busy, resolver]
  )

  const handleConfirm = useCallback(async () => {
    // If you want async work before closing, toggle busy here.
    setBusy(true)
    handleClose(true)
  }, [handleClose])

  const ctxValue = useMemo(() => confirm, [confirm])

  return (
    <ConfirmContext.Provider value={ctxValue}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <ConfirmDialog
            open={open}
            title={opts?.title || ""}
            message={opts?.message}
            confirmLabel={opts?.confirmLabel}
            cancelLabel={opts?.cancelLabel}
            onConfirm={handleConfirm}
            onCancel={() => handleClose(false)}
            busy={busy}
          />,
          document.body
        )}
    </ConfirmContext.Provider>
  )
}

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext)
  if (!ctx) {
    throw new Error("useConfirm must be used within a ConfirmProvider")
  }
  return ctx
}
