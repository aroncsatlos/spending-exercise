# Release Notes

## From Requirements

- functionality to add new spending and empty the form after that (REQ-1)
- refresh the list after a new spending is saved (REQ-1)
- show error if any field is missing (REQ-2)
- order by date and amount (REQ-3)
- filter by currency of show all spendings (REQ-4)
- SQL database added (REQ-nice-to-have)

## Miscellaneous

- added ApiContext for managing base url
- different number formatting for USD and HUF
- I chose to filter and sort the data on the backend, because it's easy to link the view (if we want push the link to history), and also less data travels
