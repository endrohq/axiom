// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

contract FactCheckContract {
  address owner;

  enum Verdict {
    PENDING, // initial state, before a verdict has been provided
    TRUE,
    FALSE,
    MISLEADING,
    OUT_OF_CONTEXT,
    UNVERIFIABLE
  }

  struct FactCheck {
    address factChecker;
    string cid;
    uint dateStarted;
    uint dateCompleted;
    Verdict verdict;
  }

  struct Claim {
    bytes32 id;
    string cid;
    FactCheck[] factCheckers;
    Verdict verdict;
  }

  uint public commitWindow = 1 hours;  // Adjust as needed

  // Event declaration
  event ClaimCreated(bytes32 claimId);
  event FactCheckerRegistered(bytes32 claimId, address factChecker);
  event VerdictSubmitted(bytes32 claimId, address factChecker, uint verdict);

  mapping(bytes32 => Claim) public claims;
  bytes32[] public claimIds;

  constructor() {
    owner = msg.sender;
  }

  function createClaim(string memory _cid, uint _verdict) public {
    require(isValidVerdict(_verdict), "Invalid verdict");

    bytes32 claimId = keccak256(abi.encodePacked(_cid));
    claims[claimId].id = claimId;
    claims[claimId].cid = _cid;
    claims[claimId].verdict = Verdict(_verdict);

    claimIds.push(claimId);

    emit ClaimCreated(claimId);
  }

  function registerFactChecker(bytes32 _claimId) public {
    Claim storage claim = claims[_claimId];
    claim.factCheckers.push(FactCheck({
      factChecker: msg.sender,
      cid: "",
      dateStarted: block.timestamp,
      dateCompleted: 0,
      verdict: Verdict.PENDING
    }));

    emit FactCheckerRegistered(_claimId, msg.sender);
  }

  function submitVerdict(bytes32 _claimId, uint _verdict, string memory _cid) public {
    require(isValidVerdict(_verdict), "Invalid verdict");

    Claim storage claim = claims[_claimId];

    // Check that the sender is a fact checker
    uint factCheckerIndex = ~uint(0);

    for (uint i = 0; i < claim.factCheckers.length; i++) {
      if (claim.factCheckers[i].factChecker == msg.sender) {
        factCheckerIndex = i;
        break;
      }
    }

    require(factCheckerIndex != ~uint(0), "Caller is not a fact checker for this claim.");

    // Update the verdict
    claim.factCheckers[factCheckerIndex].verdict = Verdict(_verdict);
    claim.factCheckers[factCheckerIndex].cid = _cid;
    claim.factCheckers[factCheckerIndex].dateCompleted = block.timestamp;

    emit VerdictSubmitted(_claimId, msg.sender, _verdict);
  }

  function getClaim(bytes32 _claimId) public view returns (Claim memory) {
    return claims[_claimId];
  }

  function getClaimsByPage(uint page) public view returns (Claim[] memory) {
    uint size = 4;

    uint tokenCount = claimIds.length;
    uint start = page * size;
    uint end = start + size;

    // Ensure the start index is not out of bounds
    require(start < tokenCount, "Start index out of bounds");

    // Adjust the end index if it's out of bounds
    if (end > tokenCount) {
      end = tokenCount;
    }

    Claim[] memory claimPage = new Claim[](end - start);

    for (uint i = 0; i < (end - start); i++) {
      bytes32 id = claimIds[start + i];
      claimPage[i] = claims[id];
    }
    return claimPage;
  }

  // Define an internal function to check the verdict validity
  function isValidVerdict(uint _verdict) internal pure returns (bool) {
    return _verdict <= uint(Verdict.UNVERIFIABLE);
  }
}
