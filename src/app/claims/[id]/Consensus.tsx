export default function Consensus() {
  return (
    <ul className="mt-4 list-disc rounded bg-gray-50 p-6 text-sm">
      <li>
        After the initial checks, a consensus mechanism is used to determine the
        overall verdict.
      </li>
      <li>
        If there is clear agreement (e.g., majority or supermajority vote), that
        becomes the verdict.
      </li>
      <li>
        If there is no clear agreement, a dispute resolution process is
        triggered. This could involve additional checks, mediation, a second
        round of voting, or other methods.
      </li>
      <li>
        The final verdict and any related dispute resolution processes are also
        recorded on the blockchain.
      </li>
    </ul>
  );
}
