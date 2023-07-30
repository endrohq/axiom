// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

contract FactCheck {
  address owner;

  struct FactChecker {
    address factCheckerAddress;
    string ipfsVerdictHash;
    bool committed;
    uint commitmentTime;
  }

  struct Claim {
    string ipfsClaimDetailsHash;
    FactChecker[] factCheckers;
    string ipfsFinalVerdictHash; // Contains the final verdict and supporting details
  }

  uint public commitWindow = 1 hours;  // Adjust as needed

  // Event declaration
  event ClaimCreated(uint claimID);


  mapping(uint => Claim) public claims;

  constructor() {
    owner = msg.sender;
  }

  function createClaim(string memory _ipfsClaimDetailsHash) public {
    Claim storage newClaim = claims[uint(keccak256(abi.encodePacked(_ipfsClaimDetailsHash)))];
    newClaim.ipfsClaimDetailsHash = _ipfsClaimDetailsHash;
    uint256 claimID = uint(keccak256(abi.encodePacked(_ipfsClaimDetailsHash)));

    emit ClaimCreated(claimID);
  }

  function registerFactChecker(uint _claimID, address _factCheckerAddress) public {
    Claim storage claim = claims[_claimID];
    claim.factCheckers.push(FactChecker({
      factCheckerAddress: _factCheckerAddress,
      ipfsVerdictHash: "",
      committed: false,
      commitmentTime: 0
    }));
  }

  function commitToFactCheck(uint _claimID, address _factCheckerAddress, string memory _ipfsVerdictHash) public {
    // Search for the fact-checker in the factCheckers array of the claim
    Claim storage claim = claims[_claimID];
    for (uint i = 0; i < claim.factCheckers.length; i++) {
      if (claim.factCheckers[i].factCheckerAddress == _factCheckerAddress) {
        claim.factCheckers[i].committed = true;
        claim.factCheckers[i].commitmentTime = block.timestamp;
        claim.factCheckers[i].ipfsVerdictHash = _ipfsVerdictHash;
        break;
      }
    }
  }

  function checkCommitment(uint _claimID, address _factCheckerAddress) public view returns (bool) {
    // Search for the fact-checker in the factCheckers array of the claim
    Claim storage claim = claims[_claimID];
    for (uint i = 0; i < claim.factCheckers.length; i++) {
      if (claim.factCheckers[i].factCheckerAddress == _factCheckerAddress) {
        return claim.factCheckers[i].committed && block.timestamp > claim.factCheckers[i].commitmentTime + commitWindow;
      }
    }
    return false;
  }
}
