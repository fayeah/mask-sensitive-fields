# mask-sensitive-fields

系统的复杂性越来越高，通过log的方式来debug至关重要，但是log中有大量的用户的隐私数据需要保护。这些隐私的数据需要被mask，这是nodejs的实现，mask掉PII的数据，方便调试，同时也保证了用户的安全性。