import React from 'react'

interface TermsAndConditionsModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  setTermsAndConditionsChecked: (checked: boolean) => void
}

export default function TermsAndConditionsModal({open, setOpen, setTermsAndConditionsChecked}: TermsAndConditionsModalProps) {

  function handleTermsAndConditionsClick() {
    setTermsAndConditionsChecked(true)
    setOpen(false)
  }

  return (
    <div>
      <input className="modal-state" id="modal-2" type="checkbox" checked={open} onChange={() => setOpen(!open)} />
      <div className="modal w-full">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 max-w-3xl">
          <label htmlFor="modal-2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
          <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur tincidunt eros sed euismod. Proin placerat enim ut nunc hendrerit pellentesque. Vestibulum et consequat nisl. Nam sit amet dapibus ante. Praesent rutrum velit tellus, sit amet feugiat orci gravida molestie. Vestibulum vitae tincidunt enim, vitae tempor mauris. Aenean ex augue, pretium vitae velit at, convallis placerat tellus. Morbi vestibulum est sed libero dictum dignissim id id massa. Praesent ultrices, lectus nec auctor efficitur, nulla tellus facilisis tortor, ut ultricies neque diam et ante. Curabitur dignissim semper arcu, eu congue nulla. Donec venenatis, lectus at finibus viverra, odio dui iaculis nisl, a congue libero enim ac augue. Ut id porta libero. In elementum urna non tortor blandit, in volutpat quam laoreet.

          Sed et lacus ullamcorper, bibendum sapien nec, efficitur augue. Ut fermentum ante ut pellentesque aliquet. Fusce aliquam eu arcu ac eleifend. Vestibulum auctor lobortis tellus eget tristique. Praesent eu dolor eu dolor laoreet ultrices. Vivamus eu mauris quis nibh dictum malesuada sed ac lectus. Integer vel bibendum est, pretium faucibus orci. Sed aliquam sed enim sit amet imperdiet. Nunc sodales nisl erat, at bibendum turpis venenatis tincidunt. Duis vehicula ipsum at turpis faucibus, a condimentum lorem auctor. Sed ultricies lorem ut augue consequat, sit amet mollis ex accumsan. Sed sit amet nunc vitae enim tincidunt mattis. Integer eleifend elit nunc, a dignissim libero fringilla a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi sit amet ultrices lacus, at egestas orci. Maecenas porttitor in ipsum a volutpat.

          Sed mollis in magna sit amet porta. Nam commodo dictum eleifend. Aliquam pellentesque lectus vehicula rutrum vehicula. Morbi finibus dolor non ornare imperdiet. Donec vel urna sodales, convallis augue at, placerat purus. Praesent sed tempus nunc. Pellentesque imperdiet, metus in pellentesque porttitor, eros nisl blandit nibh, et varius urna sem eu risus. Cras vel nunc vitae libero eleifend interdum. In et odio scelerisque, venenatis velit eget, molestie neque. Morbi a erat eu ex vulputate condimentum ut vitae lacus. Maecenas ut imperdiet erat. Nam hendrerit condimentum est, tempus interdum nisi posuere sodales. Donec porttitor auctor quam vestibulum mattis. Donec ultricies et quam sed vehicula.

          Sed arcu nulla, hendrerit a ultricies et, malesuada vitae ipsum. Donec quis varius velit, at finibus turpis. In sit amet nisi et risus pulvinar sollicitudin. Quisque semper at velit a volutpat. Nam lacinia ex sed mauris bibendum ullamcorper. Duis porta cursus arcu ut fringilla. Mauris nec arcu id nibh imperdiet lacinia. Nullam accumsan lobortis lacus. Sed accumsan, felis sed ultricies aliquam, neque nibh maximus augue, in pharetra enim eros nec enim. Donec quis auctor ex. Nullam non dolor metus. Donec quis rutrum nunc.

          Vestibulum semper, nisi eu bibendum scelerisque, est arcu scelerisque nibh, sagittis ullamcorper lectus nisi vel quam. Nulla non vestibulum nibh. Praesent semper non diam vitae mattis. Curabitur sed orci eu odio egestas bibendum vitae id ex. Nulla eget ipsum tincidunt, consectetur est sed, vestibulum tellus. Vivamus nec velit suscipit, hendrerit risus eget, tempus arcu. Praesent tincidunt ipsum eget egestas placerat.
          </span>
          <div className="flex gap-3">
            <button className="btn btn-primary btn-block" onClick={handleTermsAndConditionsClick}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}
