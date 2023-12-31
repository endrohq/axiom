// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

contract FactCheckContract {
  address owner;

  enum VerdictState {
    PENDING,
    CONCLUDED
  }

  enum Verdict {
    TRUE,
    FALSE,
    UNVERIFIABLE
  }

  struct FactCheck {
    address factChecker;
    string cid;
    Verdict verdict;
  }

  struct Claim {
    bytes32 id;
    string claim;
    string origin;
    FactCheck[] factCheckers;
    Verdict assumption;
    Verdict verdict;
  }

  uint public maxFactCheckers = 2;
  uint public commitWindow = 1 hours;

  // Event declaration
  event ClaimCreated(bytes32 claimId);
  event FactCheckerRegistered(bytes32 claimId, address factChecker);
  event VerdictSubmitted(bytes32 claimId, address factChecker, uint verdict);

  mapping(bytes32 => Claim) public claims;
  bytes32[] public claimIds;

  constructor() {
    owner = msg.sender;
  }

  function createClaim(string memory _claim, uint _verdict, string memory origin) public {
    require(isValidVerdict(_verdict), "Invalid verdict");

    bytes32 claimId = keccak256(abi.encodePacked(_claim));
    claims[claimId].id = claimId;
    claims[claimId].assumption = Verdict(_verdict);
    claims[claimId].claim = _claim;
    claims[claimId].origin = origin;

    claimIds.push(claimId);

    emit ClaimCreated(claimId);
  }

  function registerFactChecker(bytes32 _claimId) public {
    Claim storage claim = claims[_claimId];

    FactCheck memory factCheck;
    factCheck.factChecker = msg.sender;
    claim.factCheckers.push(factCheck);

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

    emit VerdictSubmitted(_claimId, msg.sender, _verdict);


    if (claim.factCheckers.length == maxFactCheckers) {
      bool allFactCheckersHaveVerdict = true;  // Assume all fact checkers have a verdict
      for (uint i = 0; i < claim.factCheckers.length; i++) {
        bool validVerdict = isValidVerdict(_verdict);
        if (!validVerdict) {
          allFactCheckersHaveVerdict = false;
          break;  // Exit loop as soon as one fact checker without a verdict is found
        }
      }
      if (allFactCheckersHaveVerdict) {
        generateFinalVerdict(_claimId);
      }
    }

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

  function generateFinalVerdict(bytes32 _claimId) public {
    Claim storage claim = claims[_claimId];

    uint[3] memory verdictCounts;  // [TRUE, FALSE, UNVERIFIABLE]

    for (uint i = 0; i < claim.factCheckers.length; i++) {
      uint verdictIndex = uint(claim.factCheckers[i].verdict);
      if (verdictIndex <= 2) {  // Ensure we only count TRUE, FALSE, and UNVERIFIABLE
        verdictCounts[verdictIndex]++;
      }
    }

    if (verdictCounts[0] > verdictCounts[1] && verdictCounts[0] > verdictCounts[2]) {
      claim.verdict = Verdict.TRUE;
    } else if (verdictCounts[1] > verdictCounts[0] && verdictCounts[1] > verdictCounts[2]) {
      claim.verdict = Verdict.FALSE;
    } else {
      claim.verdict = Verdict.UNVERIFIABLE;
    }
  }

}
