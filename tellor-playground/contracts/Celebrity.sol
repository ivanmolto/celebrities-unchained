//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "usingtellor/contracts/UsingTellor.sol";
import "usingtellor/contracts/TellorPlayground.sol";

contract Celebrity is UsingTellor {

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function readCelebPrice(uint256 _tellorId) public view returns (uint256) {
    (bool ifRetrieve, uint256 value, uint256 _timestampRetrieved) = getCurrentValue(_tellorId);
    require(ifRetrieve, "No value from Tellor oracle");
    return value;
  }
}
