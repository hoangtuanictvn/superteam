// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


contract Voting {
    mapping (address => uint256) public votesReceived;
    address[] public candidateList;

    constructor(address[] memory candidateNames) public {
        candidateList = candidateNames;
    }

    function voteForCandidate(address candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    function totalVotesFor(address candidate) view public returns (uint256) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    function validCandidate(address candidate) view public returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}