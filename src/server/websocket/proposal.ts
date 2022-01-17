enum TrackedEvents {
  ProposalCreated = 'ProposalCreated',
  VoteCast = 'VoteCast',
  ProposalExecuted = 'ProposalExecuted',
}

export default function (path, notification, options): boolean {
  if (!options.credentials.auth) {
    return false;
  }

  switch (notification.event) {
    case TrackedEvents.ProposalCreated:
      return notification.authorId === options.credentials.id;

    case TrackedEvents.VoteCast:
      return notification.authorId === options.credentials.id;

    default: {
      return false;
    }
  }
}
