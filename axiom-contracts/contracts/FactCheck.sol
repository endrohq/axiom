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
    bytes32 id;
    string cid;
    // FactChecker[] factCheckers;
  }

  uint public commitWindow = 1 hours;  // Adjust as needed

  // Event declaration
  event ClaimCreated(bytes32 claimId);


  mapping(bytes32 => Claim) public claims;
  bytes32[] public claimIds;

  constructor() {
    owner = msg.sender;
  }

  function createClaim(string memory _cid) public {
    bytes32 claimId = keccak256(abi.encodePacked(_cid));
    claims[claimId] = Claim({
        id: claimId,
        cid: _cid
    });
    claimIds.push(claimId);

    emit ClaimCreated(claimId);
  }

  /*function registerFactChecker(bytes32 _claimId, address _factCheckerAddress) public {
    Claim storage claim = claims[_claimId];
    claim.factCheckers.push(FactChecker({
      factCheckerAddress: _factCheckerAddress,
      ipfsVerdictHash: "",
      committed: false,
      commitmentTime: 0
    }));
  }

  function commitToFactCheck(bytes32 _claimId, address _factCheckerAddress, string memory _ipfsVerdictHash) public {
    // Search for the fact-checker in the factCheckers array of the claim
    Claim storage claim = claims[_claimId];
    for (uint i = 0; i < claim.factCheckers.length; i++) {
      if (claim.factCheckers[i].factCheckerAddress == _factCheckerAddress) {
        claim.factCheckers[i].committed = true;
        claim.factCheckers[i].commitmentTime = block.timestamp;
        claim.factCheckers[i].ipfsVerdictHash = _ipfsVerdictHash;
        break;
      }
    }
  }

  function checkCommitment(bytes32 _claimId, address _factCheckerAddress) public view returns (bool) {
    // Search for the fact-checker in the factCheckers array of the claim
    Claim storage claim = claims[_claimId];
    for (uint i = 0; i < claim.factCheckers.length; i++) {
      if (claim.factCheckers[i].factCheckerAddress == _factCheckerAddress) {
        return claim.factCheckers[i].committed && block.timestamp > claim.factCheckers[i].commitmentTime + commitWindow;
      }
    }
    return false;
  }*/

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
}
